'use client';

import Link from 'next/link';
import styled from 'styled-components';

function toggleDropdownOn(dropTrig:any) {
  dropTrig.target.nextSibling.classList.add("desktop-menu-toggle");
}

function toggleDropdownOff(dropTrig:any) {
    const desktopDropdowns = document.querySelectorAll('.desktop-dropdown');
    for (let i = 0; i < desktopDropdowns.length; i++) {
        desktopDropdowns[i].classList.remove("desktop-menu-toggle");
    }
}

function toggleDropdownOffSingle(dropTrig:any) {
    dropTrig.target.parentElement.classList.remove("desktop-menu-toggle");
}

function toggleMobileDropdown(dropTrig:any) {
    dropTrig.target.nextSibling.classList.toggle("mobile-menu-toggle");
}

const mobiletoggle = () => {
    document.getElementById("mobile-menu").classList.toggle("mobile-menu-active");
    document.getElementById("mobile-menu-open").classList.toggle("hidden");
    document.getElementById("mobile-menu-close").classList.toggle("hidden");
    document.body.classList.toggle("overflow-hidden");
}

// #region Styles

const HeaderStyle = styled.header`
    position: sticky;
    top: 0;
    width: 100%;
    background-color: #013725;
    padding: 32px 16px 24px 16px;
    z-index: 50;
    transition: .25s;
    @media (min-width: 992px) {
        padding: 25px 32px 24px 32px;
    }
    @media (min-width: 1440px) {
        padding: 26px 32px 32px 32px;
    }
`;

const HeaderInnerBox = styled.div`
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    align-items: center;
    justify-content: center;
    max-width: 1440px;
    margin: 0 auto;
    
`;

const DesktopLogoLink = styled.a`
    grid-column: span 12 / span 12;
    margin: auto;
    @media (min-width: 992px) {
        grid-column: span 2 / span 2;
        margin-left: 0;
    }
`;

const DesktopLogo = styled.img`
    max-width: 210px;
`;

const MobileMenuOpen = styled.div`
    position: fixed;
    bottom: 0px;
    left: auto;
    right: auto;
    width: 100%;
    padding-bottom: 55px;
    z-index: 999;
    svg {
        background-color: #D6582D;
        margin: auto;
        fill: #e2dccc;
        padding: 6px;
    }
    @media (min-width: 992px) {
        display: none;
    }
`

const MobileMenuClose = styled.div`
    position: fixed;
    bottom: 0px;
    left: auto;
    right: auto;
    width: 100%;
    padding-bottom: 55px;
    z-index: 999;
    svg {
        background-color: #D6582D;
        margin: auto;
        fill: #e2dccc;
    }
`

const DesktopNavi = styled.div`
    grid-column: span 10 / span 10;
    display: flex;
    align-items: center;
    margin-left: auto;
`

const DesktopMenu = styled.ul`
    display: none;
    @media (min-width: 992px) {
        display: grid;
        grid-auto-flow: column;
        column-gap: 2em;
    }
    @media (min-width: 1200px) {
        column-gap: 2.5em;
    }
    > * {
        &:last-child {

           a {
            border: 1px solid #d6582d;
            padding: 7px 32px 10px 32px;
            &:hover {
                background-color: #f26a36;
                color: #ffffff;
                transition: 0.25s;
            }
        }
    }
`

const DesktopMenuSingle = styled.li`
    font-family: "ibm-plex-sans", sans-serif;
    font-size: 16px;
    color: #e2dccc;
    svg {
        width: 8px;
        margin-left: 4px;
    }
    @media (min-width: 1200px) {
        font-size: 18px;
    }
`

const DesktopDropdown = styled.div`
    opacity: 0;
    pointer-events: none;
    position: absolute;
    display: flex;
    flex-wrap: wrap;
    background: #eeeeee;
    border: 1px solid #f26a36;
    padding: 0px 15px 15px 15px;
    transition: 0.25s;
    a {
        font-family: "ibm-plex-sans", sans-serif;
        width: 100%;
        color: #006a49;
        padding-top: 15px;
    }
`

const SocialIcons = styled.div`
    display: none;
    align-items: center;
    margin-left: 28px;
    svg {
        width: 28px;
        height: 28px;
        transition: .25s;
        :hover {
            fill: #D6582D;
            transition: .25s;
        }
    }
    @media (min-width: 992px) {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        column-gap: 12px;
    }
`

const MobileMenu = styled.div`
    position: fixed;
    inset: 0;
    overflow-y: scroll;
    pointer-events: none;
    opacity: 0;
    transform: scale(1.1);
    background-color: #013725;
    padding: 24px 0px 80px 0px;
    z-index: 998;
    transition: .25s;
`

const MobileItems = styled.div`
    position: relative;
    padding-bottom: 100px;
    z-index: 998;
`

const MobileMenuHeader = styled.div`
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    align-items: center;
    justify-content: center;
    padding: 6px 6px 6px 6px;
`

const MobileMenuList = styled.ul`
    padding-top: 3rem;
    padding-left: 1.5rem;
    padding-right: 1.5rem;
    max-width: 600px;
    margin: 0 auto;
    @media (min-width: 992px) {
        
    }
`

const MobileMenuSingle = styled.li`
    width: 100%;
    font-family: "ibm-plex-sans", sans-serif;
    color: #ffffff;
    font-size: 22px;
    font-weight: bold;
    a {
        display: flex;
        width: 100%;
        padding: 2rem 0 3rem 0;
    }
`

const MobileMenuSingleDrop = styled.li`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    font-size: 22px;
    margin-bottom: 1.5rem;
    font-family: "ibm-plex-sans", sans-serif;
    color: #ffffff;
    font-weight: bold;
    .dropdown-trigger {
        padding-bottom: 8px;
    }
    svg {
        pointer-events: none;
        width: 12px;
    }
    .mobile-child {
        padding: 8px 0px 8px 8px;
        width: 100%;
        font-size: 18px;
        font-weight: 400;
        opacity: 0.7;
    }
`

const MobileMenuDropTitle = styled.div`
    pointer-events: none;
`

// #endregion

export default function Header({ logos, mainMenu, mobileMenu, socialMedia }:any) {

    const mainLogo = logos[0].acf.logo.url;
    const instagram = socialMedia[0].acf.value_list[0].value;
    const facebook = socialMedia[0].acf.value_list[1].value;
    const youtube = socialMedia[0].acf.value_list[2].value;

    return (
        <>
        <HeaderStyle>
            <HeaderInnerBox>
                <DesktopLogoLink href="/">
                    <DesktopLogo src={mainLogo} />
                </DesktopLogoLink>
                <DesktopNavi onMouseLeave={toggleDropdownOff}>
                    <DesktopMenu onMouseLeave={toggleDropdownOff}>
                        {mainMenu.map((item:any) => {
                            if (item.children) {
                                return (
                                    <DesktopMenuSingle key={item.id} onMouseLeave={toggleDropdownOff}>
                                        <a id="dropdown-trigger" href={item.url} onMouseOver={toggleDropdownOn} className="desktop-trigger">
                                            {item.title}
                                            <svg fill="#ffffff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M201 337c-9.4 9.4-24.6 9.4-33.9 0L7 177c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l143 143L327 143c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9L201 337z"/></svg>
                                        </a>
                                        <DesktopDropdown id="dropdown" className="desktop-dropdown" onMouseLeave={toggleDropdownOffSingle}>
                                        {Object.keys(item.children).map((key, index) => {
                                            return (
                                                <a key={index} href={item.children[key].url}>{item.children[key].title}</a>
                                            );
                                        })}
                                        </DesktopDropdown>
                                    </DesktopMenuSingle>
                                )
                            } else {
                                return (
                                    <DesktopMenuSingle key={item.id}>
                                        <a href={item.url}>{item.title}</a>
                                    </DesktopMenuSingle>
                                )
                            }
                        })}
                    </DesktopMenu>
                    <SocialIcons>
                        <a href={instagram}>
                            <svg fill="#ffffff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224,202.66A53.34,53.34,0,1,0,277.36,256,53.38,53.38,0,0,0,224,202.66Zm124.71-41a54,54,0,0,0-30.41-30.41c-21-8.29-71-6.43-94.3-6.43s-73.25-1.93-94.31,6.43a54,54,0,0,0-30.41,30.41c-8.28,21-6.43,71.05-6.43,94.33S91,329.26,99.32,350.33a54,54,0,0,0,30.41,30.41c21,8.29,71,6.43,94.31,6.43s73.24,1.93,94.3-6.43a54,54,0,0,0,30.41-30.41c8.35-21,6.43-71.05,6.43-94.33S357.1,182.74,348.75,161.67ZM224,338a82,82,0,1,1,82-82A81.9,81.9,0,0,1,224,338Zm85.38-148.3a19.14,19.14,0,1,1,19.13-19.14A19.1,19.1,0,0,1,309.42,189.74ZM400,32H48A48,48,0,0,0,0,80V432a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V80A48,48,0,0,0,400,32ZM382.88,322c-1.29,25.63-7.14,48.34-25.85,67s-41.4,24.63-67,25.85c-26.41,1.49-105.59,1.49-132,0-25.63-1.29-48.26-7.15-67-25.85s-24.63-41.42-25.85-67c-1.49-26.42-1.49-105.61,0-132,1.29-25.63,7.07-48.34,25.85-67s41.47-24.56,67-25.78c26.41-1.49,105.59-1.49,132,0,25.63,1.29,48.33,7.15,67,25.85s24.63,41.42,25.85,67.05C384.37,216.44,384.37,295.56,382.88,322Z"/></svg>
                        </a>
                        <a href={facebook}>
                            <svg fill="#ffffff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h137.25V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 38.73V256h68.78l-11 71.69h-57.78V480H400a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48z"/></svg>
                        </a>
                        <a href={youtube}>
                            <svg fill="#ffffff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M186.8 202.1l95.2 54.1-95.2 54.1V202.1zM448 80v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h352c26.5 0 48 21.5 48 48zm-42 176.3s0-59.6-7.6-88.2c-4.2-15.8-16.5-28.2-32.2-32.4C337.9 128 224 128 224 128s-113.9 0-142.2 7.7c-15.7 4.2-28 16.6-32.2 32.4-7.6 28.5-7.6 88.2-7.6 88.2s0 59.6 7.6 88.2c4.2 15.8 16.5 27.7 32.2 31.9C110.1 384 224 384 224 384s113.9 0 142.2-7.7c15.7-4.2 28-16.1 32.2-31.9 7.6-28.5 7.6-88.1 7.6-88.1z"/></svg>
                        </a>
                    </SocialIcons>
                </DesktopNavi>
                <MobileMenu id="mobile-menu">
                    <MobileItems id="mobile-items">
                        <MobileMenuHeader>
                            <DesktopLogoLink href="/">
                                <DesktopLogo src={mainLogo} />
                            </DesktopLogoLink>
                        </MobileMenuHeader>
                        <MobileMenuList className="pt-12 px-6">
                        {mobileMenu.map((item:any) => {
                            if (item.children) {
                                return (
                                    <MobileMenuSingleDrop key={item.id}>
                                        <div id="dropdown-trigger" className="dropdown-trigger" onClick={toggleMobileDropdown}>
                                            <MobileMenuDropTitle>{item.title}</MobileMenuDropTitle>
                                        </div>
                                        {Object.keys(item.children).map((key, index) => {
                                            return (
                                                <a key={index} href={item.children[key].url} className="mobile-child" onClick={mobiletoggle}>{item.children[key].title}</a>
                                            );
                                        })}
                                    </MobileMenuSingleDrop>
                                )
                            } else {
                                return (
                                    <MobileMenuSingle key={item.id}>
                                        <a href={item.url} className="" onClick={mobiletoggle}>{item.title}</a>
                                    </MobileMenuSingle>
                                )
                            }
                        })}
                        </MobileMenuList>
                    </MobileItems>
                </MobileMenu>
            </HeaderInnerBox>
        </HeaderStyle>
        <MobileMenuOpen id="mobile-menu-open" onClick={mobiletoggle}>
            <svg width="40" height="40" viewBox="0 0 25 28" fill="#000000" xmlns="http://www.w3.org/2000/svg">
                <rect width="25" height="4" />
                <rect y="12" width="25" height="4" />
                <rect y="24" width="25" height="4" />
            </svg>
        </MobileMenuOpen>
        <MobileMenuClose id="mobile-menu-close" className="hidden" onClick={mobiletoggle}>
            <svg width="40" height="40" fill="#000000" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L160 210.7 54.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L114.7 256 9.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 301.3 265.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L205.3 256 310.6 150.6z"/></svg>
        </MobileMenuClose>
        </>
    );
}