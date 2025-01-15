import styled from 'styled-components';
import { useState, useEffect } from 'react';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 20px;
  background-image: url(https://cdn.pixabay.com/photo/2016/11/23/13/48/beach-1852945_1280.jpg);
  background-size: cover; 
  background-position: center;
  width: 100%;
  padding: 20px;
`;

const HeaderTitle = styled.h1`
  font-size: 40px;
  font-weight: bold;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const SearchBar = styled.input`
  padding: 10px;
  width: 300px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin-top: 10px;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  width: 100%;
`;

const Card = styled.div`
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const Title = styled.h2`
  color: blue;
  font-weight: bold;
`;

const Category = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: #007bff;
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 12px;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 8px;
  margin-bottom: 10px;
`;

const Footer = styled.div`
  margin-top: 40px;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 8px;
  width: 100%;
  text-align: center;
`;

const FooterTitle = styled.h3`
  margin-bottom: 10px;
`;

const DataDisplay = styled.div`
  display: flex;
  justify-content: space-around;
`;

const newsData = [
  {
    title: "윤석열 전 대통령 검찰 수사 및 체포 가능성 제기",
    content: "윤석열 전 대통령이 검찰 수사를 받고 있는 가운데, 체포 가능성이 제기되고 있습니다. 검찰은 국정원 특활비 관련 혐의를 수사 중이며, 구속영장 청구 여부를 검토하고 있습니다.",
    category: "POLITICS",
    image: "https://cdn.pixabay.com/photo/2022/06/08/16/43/sea-7250881_1280.jpg"
  },
  {
    title: "한국은행, 기준금리 3.5% 동결 결정",
    content: "한국은행 금융통화위원회가 현재 3.5%인 기준금리를 유지하기로 결정했습니다. 고물가와 가계부채 부담을 고려한 결정으로 분석됩니다.",
    category: "ECONOMY",
    image: "https://cdn.pixabay.com/photo/2021/12/25/10/41/beach-6892858_1280.jpg"
  },
  {
    title: "반도체 수출 회복세, 4개월 연속 증가",
    content: "한국의 주력 수출품목인 반도체 수출이 4개월 연속 증가세를 보이며 경제 회복에 대한 기대감이 높아지고 있습니다. 특히 AI 반도체 수요 증가가 주요 원인으로 지목됩니다.",
    category: "TECHNOLOGY",
    image: "https://cdn.pixabay.com/photo/2024/05/26/15/27/kid-8788962_1280.jpg"
  },
  {
    title: "코스피, 외국인 매수세에 2,700선 돌파",
    content: "외국인 투자자들의 대규모 매수세에 힘입어 코스피가 2,700선을 돌파했습니다. 글로벌 경기 회복 기대감과 함께 국내 기업들의 실적 개선이 주요 요인으로 작용했습니다.",
    category: "FINANCE",
    image: "https://cdn.pixabay.com/photo/2021/08/11/02/49/sunset-6537216_1280.jpg"
  }
];

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [bitcoinPrice, setBitcoinPrice] = useState(null);
  const [nasdaqIndex, setNasdaqIndex] = useState(null);

  useEffect(() => {
    // 비트코인 가격 API 호출
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setBitcoinPrice(data.bitcoin.usd); // 비트코인 가격 설정
      })
      .catch(error => {
        console.error('CoinGecko API 오류:', error);
        setBitcoinPrice('API 호출 오류');
      });

    // 나스닥 지수 API 호출
    fetch('https://query1.finance.yahoo.com/v7/finance/quote?symbols=^IXIC')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        const price = data.quoteResponse.result[0]?.regularMarketPrice;
        if (price) {
          setNasdaqIndex(price);
        } else {
          setNasdaqIndex('나스닥 데이터를 가져오는 데 실패했습니다.');
        }
      })
      .catch(error => {
        console.error("나스닥 API 호출 오류:", error);
        setNasdaqIndex('API 호출 오류');
      });
  }, []);

  const filteredNews = newsData.filter(news =>
    news.title.includes(searchTerm) || news.content.includes(searchTerm)
  );

  return (
    <Container>
      <Header>
        <HeaderTitle>Latest Card News</HeaderTitle>
        <SearchBar
          type="text"
          placeholder="검색..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Header>
      <CardGrid>
        {filteredNews.map((news, index) => (
          <Card key={index}>
            <Category>{news.category}</Category>
            <Image src={news.image} alt={news.title} />
            <Title>{news.title}</Title>
            <p>{news.content}</p>
          </Card>
        ))}
      </CardGrid>
      <Footer>
        <FooterTitle>Today's Market Updates</FooterTitle>
        <DataDisplay>
          <div>비트코인: {bitcoinPrice ? `${bitcoinPrice} USD` : '로딩 중...'}</div>
          <div>나스닥: {nasdaqIndex ? `${nasdaqIndex}` : '로딩 중...'}</div>
        </DataDisplay>
      </Footer>
    </Container>
  );
}

