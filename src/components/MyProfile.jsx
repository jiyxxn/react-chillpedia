import { useState, useEffect, useContext } from 'react';
import { UserLoginContext } from '../providers/AuthProvider';
import { StProfile } from '../styles/myPage.styled';
import { userDataValidations } from '../utils/userDataValidations';
import supabase from '../shared/supabaseClient';
import { formatDate } from '../utils/formatDate';
import { toast } from 'react-toastify';

const MyProfile = () => {
  const { user } = useContext(UserLoginContext);
  const [userProfile, setUserProfile] = useState(null);
  const [isEditProfileMode, setEditProfileMode] = useState(false);
  const [newImage, setNewImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [newNickname, setNewNickname] = useState('');

  // * 유저 프로필 정보 불러오기
  useEffect(() => {
    const getMyProfile = async (id) => {
      return await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', id)
        .single();
    };

    // user 객체가 비어있지 않을 경우 프로필 불러오기
    if (user) {
      const fetchProfile = async () => {
        try {
          const { data, error } = await getMyProfile(user.id);
          if (error) {
            toast.warning('내 정보를 불러오는 데 실패했습니다.');
            console.log('내 정보 불러오기 에러 :', error);
          }
          // 현재 프로필 및 이미지 세팅
          setUserProfile(data);
          setPreviewImage(data.image);
        } catch (error) {
          toast.warning('내 정보를 불러오는 데 실패했습니다.');
          console.log('내 정보 불러오기 에러 :', error);
        }
      };
      fetchProfile();
    }
  }, [user?.id]);

  // * 파일에서 프로필 이미지 선택 함수
  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    const imageUrl = URL.createObjectURL(file);

    // 프리뷰 이미지에 이미지 URL 저장, 선택한 이미지에 이미지 파일 저장
    setPreviewImage(imageUrl);
    setNewImage(file);
  };

  // TODO - 이미지와 닉네임 정보를 auth.user 메타데이터로 업데이트
  // * 이미지를 supabase storage에 저장
  const updateProfileImage = async (file) => {
    try {
      // 파일 이름에 타임 스탬프 추가
      const fileExt = file.name.split('.').at(-1);
      const timestamp = Date.now();
      const fileName = `user_${userProfile.id}_${timestamp}.${fileExt}`;

      // 이미 존재하는 이미지가 있다면 삭제
      if (userProfile.image) {
        const imagePath = import.meta.env.VITE_PROFILE_IMAGE_URL_BASE;
        const existingFileName = userProfile.image.split(imagePath).pop();
        const { error: deleteError } = await supabase.storage
          .from('profile-images')
          .remove([existingFileName]);
        if (deleteError) {
          throw deleteError;
        }
      }

      // 파일을 Storage에 업로드
      const { data: uploadData, error: UploadError } = await supabase.storage
        .from('profile-images')
        .upload(fileName, file);
      if (UploadError) {
        throw UploadError;
      }

      // 업로드된 이미지의 URL 가져와서 profile 테이블의 image에 저장
      const {
        data: { publicUrl },
      } = supabase.storage.from('profile-images').getPublicUrl(uploadData.path);
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ image: publicUrl })
        .eq('user_id', user.id);
      if (updateError) {
        throw updateError;
      }

      // 현재 이미지로 지정
      setUserProfile((prev) => ({
        ...prev,
        image: publicUrl,
      }));
      setPreviewImage(publicUrl);
    } catch (error) {
      return error;
    }
  };

  // * 수정한 닉네임을 profile 테이블에 반영
  const updateNickname = async () => {
    const { error } = await supabase
      .from('profiles')
      .update({ nickname: newNickname })
      .eq('user_id', user.id);
    return error;
  };

  // * 프로필 저장 함수
  const handleSaveProfile = async () => {
    // 닉네임 유효성 검사 (새 닉네임을 작성했는데 현재 닉네임과 다를 경우에만 검사)
    if (newNickname && newNickname !== userProfile.nickname) {
      const errorMessage = await userDataValidations.nickname(newNickname);
      if (errorMessage) {
        toast.warning(errorMessage);
        return;
      }
    }

    // 현재 닉네임과 다른 새로운 닉네임 있을 경우 저장
    if (newNickname && newNickname !== userProfile.nickname) {
      const error = await updateNickname();
      if (error) {
        toast.warning('닉네임 수정 중 오류가 발생하였습니다.');
        console.log('닉네임 수정 중 오류 :', error);
        return;
      }

      // 수정한 닉네임을 현재 프로필에 반영
      setUserProfile((prev) => ({
        ...prev,
        nickname: newNickname,
      }));
    }

    // 새로운 이미지 있을 경우 저장
    if (newImage) {
      const error = await updateProfileImage(newImage);
      if (error) {
        toast.warning('이미지 업로드 중 오류가 발생하였습니다.');
        console.log('이미지 업로드 중 오류 :', error);
        return;
      }
    }

    // 수정 완료 후 프로필 편집모드 끄기
    toast.success('프로필 수정이 완료되었습니다.');
    setEditProfileMode(false);

    // 선택 이미지, 닉네임 초기화
    setNewNickname('');
    setNewImage(null);
  };

  // 유저 프로필을 불러오기 전까지 컴포넌트 렌더링 X
  if (!userProfile) {
    return <div>내 프로필을 로딩중입니다...</div>;
  }

  return (
    <StProfile>
      <div className="profile-image-box">
        <img
          src={previewImage ? previewImage : '/profile_default.png'}
          alt="프로필 이미지"
        />
        {isEditProfileMode ? (
          <>
            <input
              type="file"
              id="selectImage"
              onChange={handleFileSelect}
              accept=".jpg, .jpeg, .png"
              multiple={false}
            />
            <label htmlFor="selectImage" className="edit-file-button">
              파일 첨부
            </label>
          </>
        ) : (
          <button
            className="edit-file-button"
            onClick={() => setEditProfileMode(true)}
          >
            프로필 수정
          </button>
        )}
      </div>
      <div className="user-info">
        <div className="nickname-box">
          <h3>{userProfile.nickname}</h3>
          {isEditProfileMode ? (
            <>
              <input
                type="text"
                placeholder={userProfile.nickname}
                value={newNickname}
                onChange={(e) => setNewNickname(e.target.value)}
              />
              <button onClick={handleSaveProfile}>저장</button>
            </>
          ) : (
            <></>
          )}
        </div>
        <ul>
          <li>이메일 : {user.email}</li>
          <li>가입일 : {formatDate(user.created_at, 'hyphen')}</li>
          <li>최근 접속일 : {formatDate(user.last_sign_in_at, 'hyphen')}</li>
        </ul>
      </div>
    </StProfile>
  );
};

export default MyProfile;
