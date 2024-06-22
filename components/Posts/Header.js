import PropTypes from 'prop-types';
import React from 'react'
import styled from '@emotion/styled';

const HeaderContainer = styled.div(() => ({
    margin: '10px',
    display: 'flex',
}))

const UserPhoto = styled.div(() => ({
    width: '50px',
    height: '50px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    backgroundColor: "#888",
    fontSize: '1.5rem',
    fontWeight: 'bold',

}))

const UserInfo = styled.div(() => ({
    paddingLeft: '6px',
    '& > h3': {
        fontSize: '1.2rem',
        height: '1.2rem'
    },
    '& > span': {
        fontSize: '0.9rem',
    },
}))


const Header = ({ user }) => {
    const namearr = user.name.split(' ')
    return (
        <HeaderContainer>
            <UserPhoto>
                <span>{namearr[0][0] + namearr[1][0]}</span>
            </UserPhoto>
            <UserInfo>
                <h3>{user.name}</h3>
                <span>{user.email}</span>
            </UserInfo>
        </HeaderContainer>
    )
}

Header.propTypes = {
    user: PropTypes.shape({
        name: PropTypes.string,
        email: PropTypes.string,
    }),
};

export default Header