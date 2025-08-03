import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  text-align: center;
  padding: 4rem 2rem;
`;

const Title = styled.h1`
  color: #2c3e50;
  margin-bottom: 1rem;
  font-size: 2.5rem;
`;

const Subtitle = styled.p`
  color: #6c757d;
  font-size: 1.2rem;
  margin-bottom: 3rem;
`;

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;

const FeatureCard = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const FeatureIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const FeatureTitle = styled.h3`
  color: #2c3e50;
  margin-bottom: 1rem;
`;

const FeatureDescription = styled.p`
  color: #6c757d;
  line-height: 1.6;
`;

const HomePage = () => {
  const features = [
    {
      icon: '🎯',
      title: 'Akıllı Sınıflandırma',
      description: 'Sorularınızı otomatik olarak doğru departmana yönlendiren gelişmiş ML algoritmaları.'
    },
    {
      icon: '🤖',
      title: 'Çoklu Model Desteği',
      description: 'Naive Bayes, SVM, Random Forest ve Logistic Regression modellerini karşılaştırın.'
    },
    {
      icon: '📊',
      title: 'Detaylı Analitik',
      description: 'Model performansını izleyin ve güven skorları ile tahmin kalitesini değerlendirin.'
    },
    {
      icon: '⚡',
      title: 'Hızlı ve Güvenilir',
      description: 'Gerçek zamanlı sınıflandırma ile anında sonuç alın.'
    }
  ];

  return (
    <Container>
      <Title>Hoş Geldiniz!</Title>
      <Subtitle>
        Departman Sınıflandırma Sistemi ile sorularınızı doğru departmana yönlendirin
      </Subtitle>
      
      <FeatureGrid>
        {features.map((feature, index) => (
          <FeatureCard key={index}>
            <FeatureIcon>{feature.icon}</FeatureIcon>
            <FeatureTitle>{feature.title}</FeatureTitle>
            <FeatureDescription>{feature.description}</FeatureDescription>
          </FeatureCard>
        ))}
      </FeatureGrid>
    </Container>
  );
};

export default HomePage;
