/**
 * Header Organism Component
 */
import React from 'react';
import styled from 'styled-components';
import Text from '../../atoms/Text';

const HeaderContainer = styled.header`
  background-color: #007bff;
  color: white;
  padding: 20px 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
`;

const Navigation = styled.nav`
  display: flex;
  gap: 20px;
`;

const NavLink = styled.a`
  color: white;
  text-decoration: none;
  font-weight: 500;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const Header = ({ title = "ML App", navigation = [] }) => {
  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo>
          <Text variant="h3" color="white" weight="700">
            {title}
          </Text>
        </Logo>
        {navigation.length > 0 && (
          <Navigation>
            {navigation.map((item, index) => (
              <NavLink key={index} href={item.href}>
                {item.label}
              </NavLink>
            ))}
          </Navigation>
        )}
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
