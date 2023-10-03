'use client';
import React from 'react';
import NextImage from 'next/image';

import TitleBlock from '../common/title-block/TitleBlock';
import { Section } from '../section/Section';
import styled from 'styled-components';
import FloatUp from '../common/float-up/FloatUp';
import DescriptionBlock from '../common/description-block/DescriptionBlock';
import { appTheme } from '../../theme';
import Buttons from '../common/buttons/Buttons';
import SlightParallax from '../common/slight-parallax/SlightParallax';
import SectionHead from '../section/head/SectionHead';

const HeroTitle = styled(TitleBlock)`
  .title {
    margin-bottom: 20px;

    ${appTheme.media.md} {
      margin-bottom: 24px;
    }

    ${appTheme.media.lg} {
      margin-bottom: 28px;
    }
  }
`;
// --display: ${(props) => props.display};
const HeroSection = styled(Section)`
  position: relative;
  overflow: visible !important;

  .container {
    --paddingTop: 20px;
    padding-bottom: 0;
  }

  ${appTheme.media.md} {
    overflow: hidden !important;
  }

  &[data-display='block'] {
    &:after {
      //   display: var(--display);
      position: absolute;
      bottom: -300px;
      left: 0;
      width: 100%;
      height: 300px;
      content: '';
      z-index: -1;
    }

    ${appTheme.media.md} {
      overflow: visible !important;
    }
  }

  &[data-disabledOverflow='true'] {
    overflow: visible !important;
  }
`;

const CustomButtons = styled(Buttons)`
  justify-content: space-between;

  ${appTheme.media.md} {
    justify-content: flex-start;
  }
`;

const HeroBox = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: stretch;

  ${appTheme.media.md} {
    flex-direction: row;
    margin-top: 40px;
    min-height: 400px;
  }

  ${appTheme.media.lg} {
    min-height: 466px;
    margin-top: 64px;
  }
`;

const HeroLeft = styled.div`
  position: relative;
  min-height: 100%;
  flex: 1 1 auto;
  z-index: 1;

  ${appTheme.media.md} {
    margin-bottom: 30px;
  }

  ${appTheme.media.lg} {
    margin-bottom: 50px;
  }

  ${CustomButtons} {
    margin-top: 36px;

    ${appTheme.media.md} {
      & > * {
        margin-right: 28px;
      }
    }

    ${appTheme.media.lg} {
      & > * {
        margin-right: 54px;
      }
    }
  }
`;

const HeroDecor = styled.div`
  width: 100%;
  margin: 34px 0 0;
  position: relative;

  div {
    width: 100%;
    height: 100%;
  }

  div:nth-child(2) {
    position: absolute;
    top: 0;
    left: 0;
  }

  ${appTheme.media.md} {
    margin: 0 0 0 40px;
    flex: 1 0 calc(46% - 20px);
  }

  ${appTheme.media.lg} {
    margin: 0 0 0 40px;
    flex: 1 0 calc(54% - 20px);
  }

  img {
    max-width: 75%;
    max-height: 240px;
    display: block;

    ${appTheme.media.md} {
      max-height: none;
      position: absolute;
      max-width: none;
      height: 100%;
      width: auto;
    }
  }

  &[data-variant='image'] {
    min-height: 100%;
    margin: 44px 0 -25px;
    width: 100%;
    justify-content: flex-start;
    align-items: flex-start;

    ${appTheme.media.md} {
      flex: 1 0 46%;
      margin: 0 0 0 40px;
    }

    ${appTheme.media.lg} {
      margin-bottom: 0px;
      flex: 1 0 53%;
    }

    img {
      display: block;
      width: 100%;
      height: auto;
      max-width: none;
      max-height: none;
      border-radius: 10px;
      box-shadow: 0px 20px 40px rgba(0, 0, 0, 0.2);

      ${appTheme.media.md} {
        border-radius: 15px;
      }
    }
  }
`;

export const Hero = (props: any) => {
  const {
    section,
    title,
    titleIcon,
    titleTip,
    titleVariant,
    description,
    descriptionVariant,
    buttons = [],
    decor = {},
    titleColor,
    descriptionColor,
    isHomePage,
    additionalElement,
  } = props;

  const { hasParallax, alt, src, variant, secondSrc } = decor;

  const updatedButtons = [
    {
      ...buttons[0],
      color: 'white',
      background: 'white',
      variant: 'white',
    },
    {
      ...buttons[1],
      color: 'white',
      borderColor: 'blue',
      background: null,
      variant: 'blue',
    },
  ];

  return (
    <>
      <HeroSection
        {...section}
        data-display={isHomePage ? 'block' : 'none'}
        data-disabledOverflow={Boolean(additionalElement)}
        bgColor="blue"
        neighborBg="#32408b"
      >
        <HeroBox>
          <HeroLeft>
            <FloatUp>
              {/* make h1 */}
              <SectionHead title={title}></SectionHead>
              <HeroTitle tip={titleTip} icon={titleIcon} color={titleColor} variant={titleVariant} />
            </FloatUp>
            <FloatUp delay={200}>
              {description ? (
                <DescriptionBlock color={descriptionColor} text={description} variant={descriptionVariant} />
              ) : null}
            </FloatUp>

            {/* {form ? <FormBlock form={form} /> : null} */}

            <CustomButtons buttons={updatedButtons} initialAnimationDelay={300} />
          </HeroLeft>
          {decor ? (
            <HeroDecor data-variant={variant}>
              {secondSrc ? (
                <>
                  <SlightParallax disabled={false} amplitude={0.02}>
                    <NextImage priority src={src} alt={alt} fill unoptimized objectFit="contain" />
                  </SlightParallax>
                  <SlightParallax disabled={false} amplitude={0.1}>
                    <NextImage priority src={secondSrc} alt={alt} fill unoptimized objectFit="contain" />
                  </SlightParallax>
                </>
              ) : (
                <SlightParallax disabled={!hasParallax}>
                  <NextImage priority src={src} alt={alt} fill unoptimized objectFit="contain" />
                </SlightParallax>
              )}
            </HeroDecor>
          ) : null}
        </HeroBox>
      </HeroSection>
    </>
  );
};