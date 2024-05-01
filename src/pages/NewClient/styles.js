import styled from "styled-components";

export const Container = styled.div`
    background: ${({theme}) => theme.COLORS.GRAY_200};

    .ticketInfo {
        font-weight: bold;
        margin-top: 1.5rem;
        width: 18.75rem;
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        div {
            width: 15.625rem;
            margin-bottom: 1.5rem;
        }
    }
`;

export const Header = styled.div`
    padding-left: 1.5rem;
    height: 4.5rem;
    background-color: ${({theme}) => theme.COLORS.BACKGROUND_700};
    display: flex;
    justify-content: center;
    align-content: center;
    flex-direction: row;
    align-items: center;

    h1 {
        font-size: 1.5rem;
    }

    .header_title {
        width: 31.25rem;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.75rem;

        div {
            width: 9.375rem;
            margin-bottom: 0;
        }

        input {
            text-align: right;
        }

        .header_tittle_sla {
            width: 21.875rem;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            position: absolute;
            right: 1.5rem;

            label {
                font-weight: bold;
                color: ${({theme}) => theme.COLORS.WHITE};
                font-size: 1.5rem;
                text-align: center;
            }

            .color-orange {
                color: ${({theme}) => theme.COLORS.ORANGE};
            }

            input {
                text-align: center;
            }
        }
    }

    .background-color-orange {
        background-color: ${({theme}) => theme.COLORS.ORANGE};
        color: ${({theme}) => theme.COLORS.WHITE};
        font-weight: bold;

        input {
            color: ${({theme}) => theme.COLORS.WHITE};
        }
    }

    h1 {
        color: ${({theme}) => theme.COLORS.WHITE};
    }

    svg {
        color: ${({theme}) => theme.COLORS.ORANGE};
        position: absolute;
        top: 1.375rem;
        left: 1.5rem;
        cursor: pointer;
        font-size: 1.25rem;
    }
`;

export const Content = styled.div`
    display: flex;
    gap: 2.25rem;
    justify-content: space-between;
    padding: 1.5rem;
    justify-content: center;
`;


export const Logo = styled.div`
    position: absolute;
    right: 1.5rem;
    height: 4.5rem;
    background-color: ${({theme}) => theme.COLORS.BACKGROUND_700};
    color: ${({theme}) => theme.COLORS.WHITE};
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
        width: 100%;
        height: 100%;
    }
`;
