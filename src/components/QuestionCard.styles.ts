import styled from 'styled-components';

export const CardWrapper = styled.div`

    box-shadow: 0 5px 10px rgba(0,0,0,0.2);
    padding: 15px 25px;
    border: 1px solid #888888;
    max-width: 400px;
    min-width: 280px;

    .question-number {
        text-align: center;
        border-bottom: 1px solid #292929;
        width: 70%;
        margin: 20px auto;    
    }

    .question-answers {
        margin: 10px 0;
    }

    .question {
        text-align: center;
    }
`

type ButtonWrapperProps = {
    correct: boolean;
    userClicked: boolean;
}

export const ButtonWrapper = styled.div<ButtonWrapperProps>`
    transition: all 0.3s ease-in-out;

    :hover {
        opacity: 0.8;
    }

    button {
        cursor: pointer;
        user-select: none;
        width: 100%;
        font-size: 0.8rem;
        height: 40px;
        margin: 5px 0;
        background: ${({correct, userClicked}) => 
            correct 
                ? 'linear-gradient(90deg, #05f976, #00c158)'
                : !correct && userClicked
                ? 'linear-gradient(90deg, #ff2b2b, #de0000)'
                : 'linear-gradient(90deg, #f3f9fb, #d9dede)'
        };
        border: 1px solid #888888;
        box-shadow: 1px 2px 0 rgba(0,0,0,0.1);
        border-radius: 10px;
    }

    span {
        color: ${({correct, userClicked}) => 
            correct 
                ? '#292929'
                : !correct && userClicked
                ? '#dddddd'
                : '#292929)'
        };
    }

`