import React from 'react';
import styled from 'styled-components';

const MenuList = styled.ul`
  list-style: none;
  padding: 1rem 0;
  margin: 0;
`;

const MenuItem = styled.li`
  margin: 0;
`;

const MenuLink = styled.button`
  width: 100%;
  padding: 1rem 1.5rem;
  background: ${props => props.active ? 'rgba(52, 152, 219, 0.2)' : 'transparent'};
  border: none;
  border-left: ${props => props.active ? '4px solid #3498db' : '4px solid transparent'};
  color: ${props => props.active ? '#3498db' : '#ecf0f1'};
  text-align: left;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  
  &:hover {
    background: rgba(52, 152, 219, 0.1);
    color: #3498db;
  }
  
  .icon {
    margin-right: 0.75rem;
    font-size: 1.1rem;
  }
`;

const MenuSection = styled.div`
  margin-top: 2rem;
  padding: 0 1.5rem;
  
  h3 {
    font-size: 0.7rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    color: #7f8c8d;
    margin-bottom: 1rem;
    font-weight: 600;
  }
`;

const Navigation = ({ activeMenu, onMenuChange }) => {
  const menuItems = [
    {
      id: 'home',
      label: 'Ana Sayfa',
      icon: '🏠'
    },
    {
      id: 'classification',
      label: 'Department Classification',
      icon: '🎯'
    },
    {
      id: 'models',
      label: 'ML Modelleri',
      icon: '🤖'
    },
    {
      id: 'analytics',
      label: 'Analitik',
      icon: '📊'
    }
  ];

  const settingsItems = [
    {
      id: 'settings',
      label: 'Ayarlar',
      icon: '⚙️'
    },
    {
      id: 'help',
      label: 'Help',
      icon: '❓'
    }
  ];

  return (
    <>
      <MenuList>
        {menuItems.map(item => (
          <MenuItem key={item.id}>
            <MenuLink
              active={activeMenu === item.id}
              onClick={() => onMenuChange(item.id)}
            >
              <span className="icon">{item.icon}</span>
              {item.label}
            </MenuLink>
          </MenuItem>
        ))}
      </MenuList>
      
      <MenuSection>
        <h3>Sistem</h3>
        <MenuList>
          {settingsItems.map(item => (
            <MenuItem key={item.id}>
              <MenuLink
                active={activeMenu === item.id}
                onClick={() => onMenuChange(item.id)}
              >
                <span className="icon">{item.icon}</span>
                {item.label}
              </MenuLink>
            </MenuItem>
          ))}
        </MenuList>
      </MenuSection>
    </>
  );
};

export default Navigation;
