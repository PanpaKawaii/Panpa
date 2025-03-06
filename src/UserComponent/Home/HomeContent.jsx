import React from 'react'
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Row, Col, Card, Spinner, Carousel } from 'react-bootstrap';
import './HomeContent.css'


export default function HomeContent() {

    const [STOREs, setSTOREs] = useState(null);
    const [PODs, setPODs] = useState(null);
    const [BOOKINGs, setBOOKINGs] = useState(null);
    const [TYPEs, setTYPEs] = useState(null);
    const [UTILITIes, setUTILITIes] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Những lựa chọn trên thanh tìm kiếm
    const [selectedStore, setSelectedStore] = useState('');
    const [selectedPod, setSelectedPod] = useState('');
    const [selectedType, setSelectedType] = useState('');
    const [selectedUtility, setSelectedUtility] = useState('');

    // Lấy Utility được chọn
    const filteredUtilities = UTILITIes ? UTILITIes.filter(utility =>
        utility.id.toString() === selectedUtility.toString() || !selectedUtility.toString()
    ) : [];

    // Lấy Pods của Utility được chọn
    const Pods = (filteredUtilities && filteredUtilities.length > 0) ? filteredUtilities[0].pods : [];

    // Create a new array uniquePodName with unique pod names
    const [uniquePodName, setUniquePodName] = useState([]);

    // Lấy đánh giá của STORE dựa trên đánh giá của các Booking
    const getStoreBookingRating = (storeId) => {
        const podsOfStore = PODs ? PODs.filter(pod => pod.storeId == storeId) : [];
        const bookingsOfPods = podsOfStore.length > 0 ? BOOKINGs.filter(booking => podsOfStore.some(pod => pod.id == booking.podId)) : [];
        const filteredBooking = bookingsOfPods ? bookingsOfPods.filter(booking => booking.rating !== null && booking.rating > 0) : [];
        const rating = filteredBooking.map(booking => booking.rating).reduce((sum, rating) => sum + rating, 0);
        return (rating / filteredBooking.length).toFixed(1);
    };

    //Lấy Pods trùng khớp với những lựa chọn trên thanh tìm kiếm
    const filteredResults = Pods ? Pods.filter(pod =>
        (pod.storeId == selectedStore || !selectedStore) &&
        (pod.name === selectedPod || !selectedPod) &&
        (pod.typeId.toString() === selectedType.toString() || !selectedType.toString())
    ) : [];

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ selectedStore, selectedPod, selectedType, selectedUtility });
        console.log('filteredResults', filteredResults);
    };

    if (!STOREs) return <div className='POD-home'>Chưa có gì hết đâu mấy bạn...</div>

    return (
        <div className='POD-home'>

            <div className='booking-now'>
                <div className='booking-now-text'>
                    <h1><b>ĐẶT CHỖ NGAY</b></h1>
                    <h1><b>TẠI NƠI CỦA BẠN</b></h1>
                </div>
            </div>

            <div className='shortcut-booking-pod'>
                <div className='shortcut-booking-store'>
                    <h1><b>CƠ SỞ THỊNH HÀNH!</b></h1>
                    <Row className='image-row'>
                        {STOREs && STOREs.filter(store => store.status === 'Đang hoạt động').map(store => (
                            <Col lg={12} xl={6} xxl={5} key={store.id} className='image-col'>
                                <Card className='image-card'>

                                    <Card.Body className='card-body'>
                                        <div className='card-name-rating'>
                                            <h3><b>{store.name}</b></h3>
                                            {getStoreBookingRating(store.id) && getStoreBookingRating(store.id) > 0 ?
                                                <span style={{ color: 'gold', fontSize: '2em' }}><b>{getStoreBookingRating(store.id)}</b><i className='fa-solid fa-star'></i></span>
                                                :
                                                <span style={{ color: 'gold', fontSize: '2em' }}><i className='fa-solid fa-star'></i></span>
                                            }
                                        </div>
                                        {store.status === 'Đang hoạt động' && <h5 style={{ color: '#28a745' }}><b>Đang hoạt động</b></h5>}
                                        {store.status === 'Dừng hoạt động' && <h5 style={{ color: '#dc3545' }}><b>Dừng hoạt động</b></h5>}
                                        <div className='card-info'>
                                            <p><b>Địa chỉ:</b> {store.address}</p>
                                            <p><b>Liên hệ:</b> {store.contact}</p>
                                            <p>
                                                <b>Đa dạng loại hình:</b> <span>
                                                    {TYPEs && TYPEs.map((type, index) => (
                                                        <span key={type.id}>
                                                            {type.name}{index < TYPEs.length - 1 ? ', ' : ''}
                                                        </span>
                                                    ))}
                                                </span>
                                            </p>
                                            {TYPEs && TYPEs.length > 0 ?
                                                (
                                                    <p><b>Sức chứa:</b> {Math.min(...TYPEs.map(type => type.capacity))} - {Math.max(...TYPEs.map(type => type.capacity))}
                                                        <span className='capacity-icon'> người <i className='fa-solid fa-user'></i></span>
                                                    </p>
                                                ) : null
                                            }
                                        </div>
                                        {store.status === 'Đang hoạt động' ?
                                            <Link to={`booking/store/${store.id}`}><Button className='btn'>CHI TIẾT</Button></Link>
                                            :
                                            <Button className='btn'>CHI TIẾT</Button>
                                        }
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </div>
            </div>

            <div className='shortcut-contact'>
                <h1><b>BẠN GẶP VẤN ĐỀ GÌ SAO?</b></h1>
                <div className='card-contact'>
                    <Form className='card-form'>
                        <h1><b>LIÊN HỆ CHÚNG TÔI</b></h1>
                        <Form.Text><p>InnoSpace luôn sẵn sàng lắng nghe câu hỏi và ý kiến đóng góp từ bạn!</p></Form.Text>
                        <Form.Text><p>Chúng tôi sẽ phản hồi ngay trong 24h tiếp theo!</p></Form.Text>

                        <Form.Group controlId='formName' className='form-group form-input'>
                            <Form.Control className='input' type='text' placeholder='Họ tên' />
                        </Form.Group>

                        <Form.Group controlId='formEmail' className='form-group form-input'>
                            <Form.Control className='input' type='email' placeholder='Email' />
                        </Form.Group>

                        <Form.Group controlId='formPhoneNumber' className='form-group form-input'>
                            <Form.Control className='input' type='text' placeholder='Số điện thoại' />
                        </Form.Group>

                        <Form.Group controlId='formYourProblem' className='form-group form-input'>
                            <Form.Control className='input' as='textarea' placeholder='Vấn đề của bạn' />
                        </Form.Group>
                        <Button className='btn'>GỬI</Button>
                    </Form>
                </div>
            </div>

            <div className='shortcut-why'>
                <h1><b>VÌ SAO NÊN CHỌN INNOSPACE?</b></h1>
                <Carousel data-bs-theme="light">
                    <Carousel.Item>
                        <Carousel.Caption className='carousel-text'>
                            <h3>KHÔNG GIAN LÀM VIỆC ĐA DẠNG</h3>
                            <p>Đáp ứng nhu cầu đa dạng từ các sinh viên, freelancer đến doanh nghiệp nhỏ, với lựa chọn đa dạng từ phòng làm việc cá nhân đến không gian làm việc nhóm.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Carousel.Caption className='carousel-text'>
                            <h3>QUẢN LÝ ĐẶT CHỖ THÔNG MINH</h3>
                            <p>Giao diện thân thiện, cho phép bạn dễ dàng tìm kiếm và đặt chỗ theo nhu cầu, thời gian và ngân sách.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <Carousel.Caption className='carousel-text'>
                            <h3>DỊCH VỤ TOÀN DIỆN</h3>
                            <p>Thanh toán trực tuyến và cung cấp các gói dịch vụ linh hoạt kèm các tiện ích.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>

            </div >
        </div >
    )
}
