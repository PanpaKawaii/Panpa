import React, { useState, useRef, useEffect } from 'react';
import './Notification.css';

export default function Notification() {

    const ListTab = [
        { id: 'tab1', icon: 'fa-solid fa-house' },
        { id: 'tab2', icon: 'fa-solid fa-gift' },
        { id: 'tab3', icon: 'fa-solid fa-receipt' },
        { id: 'tab4', icon: 'fa-solid fa-clock-rotate-left' },
        { id: 'tab5', icon: 'fa-solid fa-xmark' },
    ]

    const [activeTab, setActiveTab] = useState('tab1');
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
        setDropdownOpen(false);
    };

    const toggleDropdown = () => {
        setDropdownOpen((prev) => !prev);
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        };
        window.addEventListener('click', handleClickOutside);
        return () => window.removeEventListener('click', handleClickOutside);
    }, []);

    return (
        <div className='notification-container' >
            <h2>Thông báo của tôi</h2>
            <div className='notification-content'>
                <div className='menuBar'>
                    {ListTab.map((tab) => (
                        <div
                            key={tab.id}
                            className={`menuItem ${activeTab === tab.id && 'activeMenuItem'} ${activeTab === tab.id && 'activeMenuItem'}`}
                            onClick={() => handleTabClick(tab.id)}
                            style={{
                                borderBottom: activeTab === tab.id && '2px solid #007bff',
                            }}
                        >
                            <i className={tab.icon}></i> ABC
                        </div>
                    ))}
                </div>

                <div className='tabContent'>
                    {activeTab === 'tab1' && (
                        <>
                            <div className='message'>Bạn chưa có thông báo</div>
                            <button>Tiếp tục mua sắm</button>
                        </>
                    )}
                    {activeTab === 'tab2' && (
                        <>
                            <div className='message'>Chưa có quà tặng nào.</div>
                            <button>Khám phá ưu đãi</button>
                        </>
                    )}
                    {activeTab === 'tab3' && (
                        <>
                            <div className='message'>Bạn chưa có hóa đơn nào.</div>
                            <button>Xem đơn hàng</button>
                        </>
                    )}
                    {activeTab === 'tab4' && (
                        <>
                            <div className='message'>Chưa có lịch sử hoạt động.</div>
                            <button>Làm mới</button>
                        </>
                    )}
                    {activeTab === 'tab5' && (
                        <>
                            <div className='message'>Tùy chọn khác sẽ hiển thị tại đây.</div>
                            <div style={{ position: 'relative' }} ref={dropdownRef}>
                                <button onClick={toggleDropdown}>
                                    Cài đặt ▼
                                </button>
                                {dropdownOpen && (
                                    <div className='dropdownMenu'>
                                        <a href='#' className='dropdownItem'>Tùy chọn 1</a>
                                        <a href='#' className='dropdownItem'>Tùy chọn 2</a>
                                        <a href='#' className='dropdownItem'>Tùy chọn 3</a>
                                    </div>
                                )}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div >
    )
}
