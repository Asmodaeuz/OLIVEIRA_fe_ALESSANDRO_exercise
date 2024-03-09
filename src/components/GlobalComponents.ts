import styled from 'styled-components';

export const Container = styled.div<{row: false}>`
    flex: 1;
    margin: 20px 40px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    flex-direction: ${props => props.row ? 'row' : 'column'};
    
    &.margin-reset {
        margin: 20px 0;
    }

    @media screen and (max-width: 450px) {
        margin: 20px 0;
    }
`;
