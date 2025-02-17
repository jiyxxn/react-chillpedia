import styled, { css } from 'styled-components';
import { foodTypeList } from '../components/category';
import { useState, useEffect } from 'react';
import { HandleSelectBox } from '../components/HandleSelectBox';
import { locationList } from '../components/locationList';
import supabase from '../shared/supabaseClient';
import { useLocation, useNavigate } from 'react-router-dom';
import { UserLoginContext } from '../providers/AuthProvider';

const priceRange = {
  UNDERTEN: '10,000원 이하',
  TENTOTWENTTY: '10,000원 ~ 20,000원',
  TWENTTYTOTHIRTY: '20,000원 ~ 30,000원',
  THIRTYTOFOURTY: '30,000원 ~ 40,000원',
  FOURTYTOFIFTY: '40,000원 ~ 50,000원',
  OVERFIFTY: '50,000원 이상',
};
const priceRangeList = Object.entries(priceRange);

const PostWrite = () => {
  const location = useLocation();
  const { postId } = location.state || {};
  const navigate = useNavigate();
  const [imageSrc, setImageSrc] = useState(null);
  const [oldPostData, setOldPostData] = useState({});
  const [oldImageName, setOldImageName] = useState('');
  const [imageName, setImageName] = useState('');
  const POST_DEFAULT_IMAGE = '/public/postDefaultImage.png';
  const img = import.meta.env.VITE_IMAGE_URL_BASE;
  const { isLogin, user } = useContext(UserLoginContext);

  useEffect(() => {
    if (!isLogin) {
      alert('글쓰기는 로그인해야 가능합니다!');
      navigate('/login');
    }
  });

  const [post, setPost] = useState({
    image_url: '',
    restaurant_name: '',
    restaurant_address: '',
    restaurant_location: locationList[0][1],
    recommended_menu: '',
    price_range: priceRange.UNDERTEN,
    category: foodTypeList[0][1],
    content: '',
  });

  // 수정 버튼 onClick으로 들어왔을 때 작성된 post 정보 불러와서 화면에 뿌리기
  useEffect(() => {
    if (postId) {
      const getPostAndRender = async () => {
        try {
          const { data: postData, error } = await supabase
            .from('posts')
            .select('*')
            .eq('id', postId)
            .single();
          setPost(postData);
          setOldPostData(postData);
          setImageSrc(postData.image_url);
          setOldImageName(postData.image_url.split(img).pop());
        } catch (error) {
          console.error('error', error);
        }
      };
      getPostAndRender();
    }
  }, []);

  // 각 StInput box 변동 생길 때마다 post 업데이트
  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === 'image_url') {
      value = e.target.files[0];
      setImageName(value.name);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result);
      };
      reader.readAsDataURL(value);
    }
    setPost((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // 모든 input 들어왔는지 확인
  const isItFilled = () => {
    if (
      !post.image_url ||
      !post.restaurant_name ||
      !post.restaurant_address ||
      !post.recommended_menu ||
      !post.content
    ) {
      return false;
    }
    return true;
  };

  // 이미지 업로드
  const uploadImage = async () => {
    try {
      const { data, error } = await supabase.storage
        .from('post-images')
        .upload(`user-uploads/${post.image_url.name}`, post.image_url);

      if (error) {
        console.error('Upload error:', error);
        throw error;
      }
      return data;
    } catch (error) {
      console.error('Unexpected error:', error);
      throw error;
    }
  };

  // 이미지 삭제
  const deleteImage = async () => {
    try {
      const { data, error } = await supabase.storage
        .from('post-images')
        .remove(oldImageName);

      if (error) {
        console.error('error', error);
        return reject(error);
      }
      return data;
    } catch (error) {
      console.error('error', error);
      throw error;
    }
  };

  // 업로드 버튼 누르면 사진은 supabase bucket에, 올라간 사진 url과 나머지 모든 값은 posts table에 저장
  const handleUpload = async () => {
    if (!isItFilled()) {
      return alert('모든 박스를 채워주세요');
    }

    // 수정할 때 이미지가 바뀌는 경우 기존에 업로드된 이미지 삭제
    if (postId && post.image_url !== oldPostData.image_url) {
      await deleteImage().catch((err) => console.error('이미지 삭제 실패!'));
    }

    if (post.image_url !== oldPostData.image_url || !postId) {
      await uploadImage().catch((err) => console.error('이미지 업로드 실패!'));
    }

    const uploadDatas = {
      image_url: `${import.meta.env.VITE_IMAGE_URL_BASE}user-uploads/${imageName}`,
      restaurant_name: post.restaurant_name,
      restaurant_address: post.restaurant_address,
      restaurant_location: post.restaurant_location,
      recommended_menu: post.recommended_menu,
      price_range: post.price_range,
      category: post.category,
      content: post.content,
      writer_id: user.id,
    };

    if (!postId) {
      try {
        await supabase.from('posts').insert([uploadDatas]);
        alert('성공적으로 업로드 되었습니다!');
      } catch (error) {
        return console.error('error:', error.message);
      }
    } else {
      try {
        const { error } = await supabase
          .from('posts')
          .update(uploadDatas)
          .eq('id', postId);
        alert('성공적으로 수정 되었습니다!');
      } catch (error) {
        return console.error('error', error.message);
      }
    }
    navigate(`/`);
  };

  return (
    <StContainer>
      <StDiv>
        <StForm>
          <div>
            <StImg src={imageSrc ? imageSrc : POST_DEFAULT_IMAGE} />
            <StInput
              type="file"
              accept="image/*"
              name="image_url"
              onChange={handleChange}
            />
          </div>
          <StInputsArea>
            <StLabel>
              상호명
              <StInput
                type="text"
                name="restaurant_name"
                value={post.restaurant_name}
                onChange={handleChange}
              />
            </StLabel>
            <StLabel>
              지역
              <HandleSelectBox
                datas={locationList}
                selectName={'restaurant_location'}
                selectValue={post.restaurant_location}
                selectOnChange={handleChange}
              />
            </StLabel>
            <StLabel>
              카테고리
              <HandleSelectBox
                datas={foodTypeList}
                selectName={'category'}
                selectValue={post.category}
                selectOnChange={handleChange}
              />
            </StLabel>
            <StLabel>
              주소
              <StInput
                type="text"
                name="restaurant_address"
                value={post.restaurant_address}
                onChange={handleChange}
              />
            </StLabel>
            <StLabel>
              추천메뉴
              <StInput
                type="text"
                name="recommended_menu"
                value={post.recommended_menu}
                onChange={handleChange}
              />
            </StLabel>
            <StLabel>
              가격대
              <HandleSelectBox
                datas={priceRangeList}
                selectName={'price_range'}
                selectValue={post.price_range}
                selectOnChange={handleChange}
              />
            </StLabel>
            <StLabel>
              내용
              <StInput
                type="text"
                name="content"
                value={post.content}
                onChange={handleChange}
              />
            </StLabel>
          </StInputsArea>
        </StForm>
      </StDiv>
      <StButton type="button" onClick={handleUpload}>
        업로드
      </StButton>
    </StContainer>
  );
};

const StContainer = styled.div`
  width: 100%;
  height: 100%;
  background-color: var(--color-white);
  display: flex;
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StDiv = styled.div`
  width: 1100px;
  height: 902px;
`;

const StForm = styled.div`
  width: 1100px;
  height: 770px;
  border: 1px solid var(--color-gray);
  border-radius: 20px;
  display: flex;
  justify-items: start;
  align-items: center;
  flex-direction: row;
  gap: 54px;
`;

const StImg = styled.img`
  width: 390px;
  height: 472px;
  object-fit: cover;
`;

const StInputsArea = styled.div`
  width: 474px;
  width: 636px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const StLabel = styled.label`
  width: 474px;
  height: 50px;
`;

export const StInputandSelect = css`
  width: 380px;
  height: 50px;
  border-radius: 50px;
  border: 1px solid var(--color-gray);
  background-color: var(--color-white);
`;

const StInput = styled.input`
  ${StInputandSelect}
`;

const StButton = styled.button`
  width: 1100px;
  height: 80px;
  background-color: var(--color-beige);
  border-radius: 20px;
  border: 1px solid var(--color-gray);
`;
export default PostWrite;
