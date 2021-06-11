import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`

    *, *::after, *::before {
        box-sizing: border-box;
        font-family: 'Catamaran', 'sans-serif';
    }

    html {
        height: 100%;
    }

    body {
        height: 100vh;
        background-color: #f5f5f5;
        padding: 0 20px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .copyright, .loading {
        display: flex;
        justify-content: center;
        margin: 20px auto;
    }
    
    .question-last {
        text-align: center;
        margin: 10px 0;
    }
    
    a {
        color: #292929;
        margin: 0 4px;
    }
`

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    > div {
        color: #292929;
        font-size: 2rem;
        margin: 0;
    }

    h1 {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        text-align: center;
        margin: 10px 0;
        font-size: 30px;
        font-weight: 400;
    }

    img {
        width: 70px;
        display: flex;
        margin: 0 auto;
    }

    .start, .next {
        cursor: pointer;
        border: 1px solid #888888;
        outline: none;
        box-shadow: 0px 5px 10px rgba(0,0,0,0.2);
        border-radius: 5px;
        padding: 5px 25px;
        margin: 10px auto;
        display: flex;
        justify-content: center;
        text-transform: uppercase;
    }

    .score {
        text-align: center;
        font-size: 18px;
        margin: 10px auto;
    }

  
`