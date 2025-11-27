import React, { useEffect, useState } from 'react';

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    const handleScroll = () => {
        // إذا كان موقع التمرير أكبر من 300 بكسل، اجعل الزر مرئيًا
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // لجعل التمرير سلسًا
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        // تنظيف الحدث عند تفكيك المكون
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <button 
            onClick={scrollToTop} 
            style={{
                display: isVisible ? 'block' : 'none',
                position: 'fixed',
                bottom: '20px',
                right: '20px',                                
                borderRadius: '5px',
                cursor: 'pointer',                
            }}
        className='btn btn-primary'
        >

            <i className="fa fa-arrow-circle-up fa-2x "></i>
        </button>
    );
};

export default ScrollToTopButton;
