import React from 'react';

const ownerData = {
    primo: {
        name: 'PRIMO ECALNE JR.',
        title: 'INFINITE AMBASSADOR / DIAMOND EXECUTIVE',
        img: '/assets/image/team/Sir_Primo.png',
        bio: `I’m Primo, a passionate entrepreneur driven by growth, purpose, and the desire to create meaningful opportunities through INFINITE. I believe success is built through consistency, vision, and the courage to dream beyond limits while continuously becoming a better version of yourself.<br><br>I am passionate about building a strong and positive community where people can grow together, support one another, and create opportunities that lead to long-term personal and financial growth.<br><br><a href="https://www.linkedin.com/in/primo-ecalne-3a87221a2" target="_blank" rel="noreferrer" class="owner-linkedin"><i class="bi bi-linkedin me-2"></i> Connect with me on LinkedIn</a>`,
    },
    aera: {
        name: 'AERA CLARIDAD',
        title: 'INFINITE AMBASSADOR / DIAMOND EXECUTIVE',
        img: '/assets/image/team/ma_am(2.png',
        bio: `My name is Aera Claridad, and I am passionate about helping people create a better future for themselves through INFINITE. I started this journey with a simple goal: to grow not only financially, but also personally while inspiring others to do the same.<br><br>I believe that everyone deserves the opportunity to achieve time and financial freedom. Through dedication, consistency, and the right environment, I want to help people unlock their potential and build a life they truly want for themselves and their families.<br><br>For me, success is not just about income. It is about creating impact, building genuine connections, and growing together with the people around me.<br><br><a href="https://www.linkedin.com/in/aera-claridad-68ba94179" target="_blank" rel="noreferrer" class="owner-linkedin"><i class="bi bi-linkedin me-2"></i> Connect with me on LinkedIn</a>`,
    },
};

export default function OwnerModal({ isOpen, onClose, ownerKey = 'primo' }) {
    if (!isOpen) return null;

    const data = ownerData[ownerKey] || ownerData.primo;

    return (
        <div
            className="modal fade show"
            style={{
                display: 'block',
                backgroundColor: 'rgba(15, 23, 42, 0.85)',
                zIndex: 10050,
            }}
            tabIndex="-1"
            onClick={onClose}
        >
            <div
                className="modal-dialog modal-dialog-centered modal-xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="modal-content owner-modal-content position-relative">
                    <button
                        type="button"
                        className="btn-close btn-close-custom"
                        onClick={onClose}
                        aria-label="Close"
                    ></button>

                    <div className="row g-0 align-items-stretch">
                        <div className="col-lg-5 owner-img-col">
                            <div className="glow-effect"></div>
                            <img src={data.img} id="ownerModalImg" alt={data.name} />
                        </div>

                        <div className="col-lg-7 owner-text-col d-flex flex-column justify-content-center">
                            <h3 id="ownerModalName">{data.name}</h3>
                            <h6 id="ownerModalTitle">{data.title}</h6>

                            <div className="owner-bio-box">
                                <i className="fa-solid fa-quote-left"></i>
                                <div
                                    id="ownerModalBio"
                                    dangerouslySetInnerHTML={{ __html: data.bio }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
