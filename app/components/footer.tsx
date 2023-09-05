'use client';

import Link from 'next/link';
import styled from 'styled-components';

function getYear() {
    return new Date().getFullYear();
}

// #region Styles

const FooterStyle = styled.footer`
    background-color: #013725;
    color: #ffffff;
    font-family: ibm-plex-sans,sans-serif;

    .logo {
        padding-bottom: 56px;
    }

    h6 {
        font-weight: 700;
        padding-bottom: 10px;
    }

    a {
        &:hover {
            text-decoration: underline;
        }
    }

    .container {
        max-width: 1440px;
        margin: 0 auto;
        padding: 60px 32px 60px 32px;
        @media (min-width: 992px) {
            display: flex;
            align-items: start;
            justify-content: space-between;
        }
    }

    .menus {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        grid-gap: 1rem;
        @media (min-width: 992px) {
            width: 65%;
        }
    }

    .footer-menu-item {
        width: 100%;
        padding-bottom: 32px;
    }

    .footer-child {
        display: flex;
        width: 100%;
        padding-bottom: 10px;
    }

    .address {
        line-height: 2;
    }

    .copyright {
        max-width: 1200px;
        margin: 0 auto;
        align-items: center;
        padding: 0 32px 150px 32px;
        .text {
            font-size: 12px;
            text-align: center;
            padding-bottom: 50px;
        }
        .pioneer {
            img {
                margin: 0 auto;
            }
        }
        .social {
            display: flex;
            max-width: 200px;
            margin: 0 auto;
            padding-top: 50px;
            a {
                margin: 0 auto;
            }
        }
        @media (min-width: 768px) {
            display: flex;
            .text {
                width: 33.33%;
                text-align: left;
                padding-bottom: 0px;
            }
            .pioneer {
                width: 33.33%;
            }
            .social {
                padding-top: 0px;
                margin-right: 0;
                a {
                    margin-left: auto;
                    padding-right: 24px;
                    svg {
                        transition: .25s;
                        :hover {
                            fill: #D6582D;
                            transition: .25s;
                        }
                    }
                }
            }
        }
        @media (min-width: 992px) {
            padding: 0 32px 50px 32px;
        }
    }
`;

// endregion

export default function Footer({ logos, footerMenu, socialMedia, phoneNumbers, physicalAddresses }:any) {

    const mainLogo = logos[0].acf.logo.url;
    const instagram = socialMedia[0].acf.value_list[0].value;
    const facebook = socialMedia[0].acf.value_list[1].value;
    const youtube = socialMedia[0].acf.value_list[2].value;
    const googleMaps = socialMedia[0].acf.value_list[3].value;
    const street = physicalAddresses[0].values[0].street;
    const city = physicalAddresses[0].values[0].city;
    const state = physicalAddresses[0].values[0].state;
    const zip = physicalAddresses[0].values[0].zip;
    const phone = phoneNumbers[0].values[0].value;

    return (
        <FooterStyle>
            <div className="container">
                <a href="/">
                    <img src={mainLogo} className="logo" />
                </a>
                    <div className="menus">
                        {footerMenu.map((item:any) => {
                            if (item.children) {
                                return (
                                    <div key={item.id} className="footer-menu-item">
                                        <div>
                                            <h6>{item.title}</h6>
                                        </div>
                                        {Object.keys(item.children).map((key, index) => {
                                            return (
                                                <a key={index} href={item.children[key].url} className="footer-child">{item.children[key].title}</a>
                                            );
                                        })}
                                    </div>
                                )
                            } else {
                                return (
                                    <div key={item.id}>
                                        <a href={item.url} className="">{item.title}</a>
                                    </div>
                                )
                            }
                        })}
                        <div className="contact">
                            <h6>Contact Us</h6>
                            <a href={googleMaps} className="address">
                                <div>
                                    {street}
                                </div>
                                <div>
                                    {city}, {state} {zip}
                                </div>
                            </a>
                            <a href={`tel:${phone}`}>
                                {phone}
                            </a>
                        </div>
                    </div>
            </div>
            <div className="copyright">
                <div className="text">
                    &copy; {getYear()} The KT Team, All Rights Reserved
                </div>
                <a href="https://madebypioneer.com/" className="pioneer">
                    <img src="https://inside.thektteam.org/wp-content/uploads/2023/03/pioneer.svg" />
                </a>
                <div className="social">
                    <a href={instagram}>
                        <svg width="24px" fill="#ffffff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224,202.66A53.34,53.34,0,1,0,277.36,256,53.38,53.38,0,0,0,224,202.66Zm124.71-41a54,54,0,0,0-30.41-30.41c-21-8.29-71-6.43-94.3-6.43s-73.25-1.93-94.31,6.43a54,54,0,0,0-30.41,30.41c-8.28,21-6.43,71.05-6.43,94.33S91,329.26,99.32,350.33a54,54,0,0,0,30.41,30.41c21,8.29,71,6.43,94.31,6.43s73.24,1.93,94.3-6.43a54,54,0,0,0,30.41-30.41c8.35-21,6.43-71.05,6.43-94.33S357.1,182.74,348.75,161.67ZM224,338a82,82,0,1,1,82-82A81.9,81.9,0,0,1,224,338Zm85.38-148.3a19.14,19.14,0,1,1,19.13-19.14A19.1,19.1,0,0,1,309.42,189.74ZM400,32H48A48,48,0,0,0,0,80V432a48,48,0,0,0,48,48H400a48,48,0,0,0,48-48V80A48,48,0,0,0,400,32ZM382.88,322c-1.29,25.63-7.14,48.34-25.85,67s-41.4,24.63-67,25.85c-26.41,1.49-105.59,1.49-132,0-25.63-1.29-48.26-7.15-67-25.85s-24.63-41.42-25.85-67c-1.49-26.42-1.49-105.61,0-132,1.29-25.63,7.07-48.34,25.85-67s41.47-24.56,67-25.78c26.41-1.49,105.59-1.49,132,0,25.63,1.29,48.33,7.15,67,25.85s24.63,41.42,25.85,67.05C384.37,216.44,384.37,295.56,382.88,322Z"/></svg>
                    </a>
                    <a href={facebook}>
                        <svg width="24px" fill="#ffffff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h137.25V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 38.73V256h68.78l-11 71.69h-57.78V480H400a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48z"/></svg>
                    </a>
                    <a href={youtube}>
                        <svg width="24px" fill="#ffffff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M186.8 202.1l95.2 54.1-95.2 54.1V202.1zM448 80v352c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V80c0-26.5 21.5-48 48-48h352c26.5 0 48 21.5 48 48zm-42 176.3s0-59.6-7.6-88.2c-4.2-15.8-16.5-28.2-32.2-32.4C337.9 128 224 128 224 128s-113.9 0-142.2 7.7c-15.7 4.2-28 16.6-32.2 32.4-7.6 28.5-7.6 88.2-7.6 88.2s0 59.6 7.6 88.2c4.2 15.8 16.5 27.7 32.2 31.9C110.1 384 224 384 224 384s113.9 0 142.2-7.7c15.7-4.2 28-16.1 32.2-31.9 7.6-28.5 7.6-88.1 7.6-88.1z"/></svg>
                    </a>
                </div>
            </div>
        </FooterStyle>
    );
}