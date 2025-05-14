import React from 'react';
import Slider from 'react-slick';
import { Box } from '@mui/material';
import Icon from "@mui/material/Icon";
import PropTypes from 'prop-types';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import BG1 from "assets/images/bg-profile.jpeg";
import BG2  from "assets/images/bg-reset-cover.jpeg"
import { useMaterialUIController } from "context";

function BannerCarousel() {
    const [controller] = useMaterialUIController();
    const { darkMode } = controller;
    const color = darkMode ? "#AA00FF" : "#EA80FC";
    console.log(color);
    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000
    };
    return (
    <Slider {...settings}>
        <Box
            key={1}
            component="img"
            src={BG1}
            alt={`banner-${1}`}
            sx={{ width: '100%', height: '300px' }}
        />
        <Box
            key={2}
            component="img"
            src={BG2}
            alt={`banner-${2}`}
            sx={{ width: '100%', height: '300px' }}
        />
    </Slider>
  );
}

export default BannerCarousel;
