import styled from 'styled-components';
import { MdKeyboardArrowRight, MdArrowForward } from 'react-icons/md'

export const GameSection = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: #7a7d84;
    /* background: #212121; */
`;

export const GameWrapper = styled.div`
    background: #065464;
    width: 1375px;
    border-radius: 10px;
    margin-top: 50px;
    margin-bottom: 50px;
`;

export const MinesweeperBoard = styled.div`
    background: #85c3cf;
    border-radius: 10px;
    margin-top: 1%;
    margin-left: 1%;
    margin-right: 1%;
    margin-bottom: 1%;
    padding-left: 1%;
    padding-right: 1%;
    padding-top: 1%;
    padding-bottom: 1%;
`;

export const NewGameButton = styled.div`
    margin-bottom: 50px;
    border-radius: 50px;
    background: ${({ primary }) => (primary ? '#34acbc' : '#212121')};
    white-space: nowrap;
    padding: 14px 48px;
    color: ${({ dark }) => (dark ? '#010606' : '#fff')};
    font-size: ${({ fontBig }) => (fontBig ? '20px' : '16px')};
    outline: none;
    border: none;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.2s ease-in-out;

    &:hover {
        transition: all 0.2s ease-in-out;
        background: ${({ primary }) => (primary ? '#fff' : '#01BF71')};
    }
`;

export const ArrowForward = styled(MdArrowForward)`
    margin-left: 8px;
    font-size: 20px;
`;

export const ArrowRight = styled(MdKeyboardArrowRight)`
    margin-left: 8px;
    font-size: 20px;
`;
