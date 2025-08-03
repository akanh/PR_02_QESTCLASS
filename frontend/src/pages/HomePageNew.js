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
      title: 'Smart Classification',
      description: 'Advanced ML algorithms that automatically route your questions to the correct department.'
    },
    {
      icon: '🤖',
      title: 'Multi-Model Support',
      description: 'Compare Naive Bayes, SVM, Random Forest, and Logistic Regression models.'
    },
    {
      icon: '📊',
      title: 'Detailed Analytics',
      description: 'Monitor model performance and evaluate prediction quality with confidence scores.'
    },
    {
      icon: '⚡',
      title: 'Fast and Reliable',
      description: 'Get instant results with real-time classification.'
    }
  ];

  return (
    <Container>
      <Title>Welcome!</Title>
      <Subtitle>
        Route your questions to the correct department with the Department Classification System
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
