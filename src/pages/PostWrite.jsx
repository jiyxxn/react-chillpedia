import styled, { css } from 'styled-components';
import { foodTypeList } from '../components/Category';
import { useState } from 'react';
import { HandleSelectBox } from '../components/HandleSelectBox';
import { locationList } from '../components/locationList';
import supabase from '../shared/supabaseClient';
import { useNavigate } from 'react-router-dom';

const priceRange = {
  UNDERTEN: '10,000원 이하',
  TENTOTWENTTY: '10,000원 ~ 20,000원',
  TWENTTYTOTHIRTY: '20,000원 ~ 30,000원',
  THIRTYTOFOURTY: '30,000원 ~ 40,000원',
  FOURTYTOFIFTY: '40,000원 ~ 50,000원',
  OVERFIFTY: '50,000원 이상',
};
const priceRangeList = Object.entries(priceRange);

const PostWrite = ({ postId }) => {
  const navigate = useNavigate();
  const [imageSrc, setImageSrc] = useState(null);
  const defaultImg =
    'data:image/png;base64,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';
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

  // 각 StInput box의 onChange에 연결된 함수
  const handleChange = (e) => {
    let { name, value } = e.target;

    if (name === 'image_url') {
      value = e.target.files[0];
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

  // 업로드 버튼 누르면 사진은 supabase bucket에, 올라간 사진 url과 나머지 모든 값은 posts table에 저장
  const handleUpload = async () => {
    if (!isItFilled()) {
      return alert('모든 박스를 채워주세요');
    }

    await supabase.storage
      .from('post-images')
      .upload(`public/${post.image_url.name}`, post.image_url);

    try {
      const response = await supabase.from('posts').insert([
        {
          image_url: `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/sign/post-images/public/${post.image_url}?token=${import.meta.env.VITE_SUPABASE_KEY}`,
          restaurant_name: post.restaurant_name,
          restaurant_address: post.restaurant_address,
          restaurant_location: post.restaurant_location,
          recommended_menu: post.recommended_menu,
          price_range: post.price_range,
          category: post.category,
          content: post.content,
          // writer_id: user_id,
        },
      ]);
      alert('성공적으로 업로드 되었습니다!');
      navigate(`/`);
    } catch (error) {
      return console.error('error:', error.message);
    }
  };

  return (
    <StContainer>
      <StDiv>
        <StForm>
          <div>
            <StImg src={imageSrc ? imageSrc : defaultImg} />
            <StInput
              type="file"
              accept="image/*"
              name="image_url"
              onChange={handleChange}
            />
          </div>
          <StLabels>
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
          </StLabels>
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
  height: 769px;
  border: 1px solid var(--color-gray);
  border-radius: 20px;
  display: flex;
  justify-items: start;
  align-items: center;
  display: flex;
  flex-direction: row;
  gap: 53px;
`;

const StImg = styled.img`
  width: 390px;
  height: 472px;
  object-fit: cover;
`;

const StLabels = styled.div`
  width: 473px;
  width: 636px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const StLabel = styled.label`
  width: 473px;
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
