import React, { useState } from 'react';
import { X, Clock, MapPin, Package, Phone, AlertCircle, Info } from 'lucide-react';

export default function App() {
  // 'customer': 고객사용 입고 가이드 / 'field': 현장 입고 가이드
  // 처음 접속했을 때 현장 가이드가 바로 보이게 하려면 아래 'customer'를 'field'로 바꾸세요.
  const [guideType, setGuideType] = useState('customer');
  const [activeMenuId, setActiveMenuId] = useState(1);
  const [selectedRule, setSelectedRule] = useState(null);

  // 가이드 전환 함수
  const handleSwitchGuide = (type) => {
    setGuideType(type);
    setActiveMenuId(1);
    setSelectedRule(null);
  };

  // ==========================================
  // [고객사용] 메뉴 목록
  // ==========================================
  const customerMenuItems = [
    { id: 1, title: '입고전 확인 사항' },
    { id: 2, title: '포장 기준' },
    { id: 3, title: '바코드 기준' },
    { id: 4, title: '입고 예약' },
  ];

  // ==========================================
  // [현장용] 메뉴 목록 (원하는 메뉴명으로 수정하세요)
  // ==========================================
  const fieldMenuItems = [
    { id: 1, title: '입차 및 온도 검수' },
    { id: 2, title: '하차 및 외관 검수' },
    { id: 3, title: '바코드 및 실셈 작업' },
    { id: 4, title: '전산 반영 및 적치' },
  ];

  // ==========================================
  // [고객사용 데이터 1] 센터 정보 - 입고 전 확인 사항
  // ==========================================
  const centerPreChecks = [
    {
      id: '1', title: '상품등록',
      detailDesc: <>- 모든 상품(SKU)는 입고 예약 전 스마트스토어에 등록 완료 되어야 합니다.<br/><span style={{ color: '#6b7280', fontSize: '14px' }}>(스마트 스토어 등록시 바이스 자동 연결)</span></>
    },
    {
      id: '2', title: '예약 방법',
      detailDesc: <>- 초도 입고는 스마트스토어 시스템상 등록입고예약 불가<br/>- 초도 입고 후 추가 입고건의 경우 스마트스토어에서 직접 예약 진행</>
    },
    {
      id: '3', title: '미예약 입고 제한',
      detailDesc: '- 사전 예약 없이 도착한 물품은 센터 입고가 거부되어 회송 처리될 수 있습니다.'
    },
    {
      id: '4', title: '입고수단',
      detailDesc: <>- 차량 입고 만 가능합니다.<br/><span style={{ color: '#dc2626', fontWeight: 'bold', fontSize: '16px' }}>- 택배 입고 불가합니다.</span></>
    },
    {
      id: '5', title: '검수범위',
      detailDesc: '- 입고시 외관 검수 위주로 진행되며, 제품 내부 등 정밀검품은 진행되지 않습니다.'
    },
    {
      id: '6', title: '차량 및 제품 온도 유지',
      detailDesc: <>- 입고차량 온도 유지가 되지 않으면 회송 처리 됩니다.<br/>- 입고 상품 적정 온도 유지가 되지 않으면 회송 처리 됩니다.</>
    },
    {
      id: '7', title: '유통기한',
      detailDesc: <>- 소비기한일로부터 냉장 7일, 냉동 10일 이하인 상품은 입고 불가합니다.<br/>- 유통기한이 기준에 맞지 않으면 판매자 알림후 즉시 불용처리 진행됩니다.</>
    },
    {
      id: '8', title: '재고반영',
      detailDesc: '- 하차 순서에 따라 순차적으로 진행됩니다. 당일 반영을 원칙으로 하나, 현장상황 및 입고 컨디션에 따라 시간이 소요될 수 있습니다.'
    },
  ];

  // ==========================================
  // [고객사용 데이터 2] 포장 기준
  // ==========================================
  const packagingRules = [
    {
      id: '1', title: '1박스에는 1개의 상품(SKU)만 구성해주세요',
      detailDesc: '하나의 박스에는 동일한 상품(SKU)만 담아 입고해야 하며, 단일 상품(SKU) 기준을 지키지 않을 경우 입고가 제한될 수 있습니다.',
      image: '/COLD-FIELD/pack1.png'
    },
    {
      id: '2', title: '박스 내부는 수량 확인이 가능하도록 정형화하여 포장해주세요',
      detailDesc: <>- 박스 내에는 육안으로 수량 확인이 가능해야 합니다.<br/>- 육안으로 수량 확인이 불가한 경우 벌크 입고로 간주됩니다.<br/>- 벌크 입고는 실셈 여부에 따라 재고 관리 방식이 달라집니다.</>,
      image: '/COLD-FIELD/pack2.png'
    },
    {
      id: '3', title: '동일 상품(SKU)이라도 소비기한 또는 제조 LOT가 다르면 분리 포장해주세요',
      detailDesc: <>- 동일 SKU 소비기한/LOT 동일 ➔ 입고 가능 ➔ 단일 박스 입고<br/>- 동일 SKU 소비기한/LOT 상이 ➔ 혼합 구성 불가 ➔ 소비기한/LOT 별 박스 분리 포장후 입고</>,
      image: '/COLD-FIELD/pack3.png'
    },
    {
      id: '4', title: '완카톤 수량이 아닌 잔량 박스 입고의 경우, 실셈 비용이 발생합니다',
      detailDesc: <>- 잔량박스란 품고 전산 내 등록된 박스 입수량 보다 실제 입고된 박스 내 수량이 적은 경우를 의미 합니다.<br/>- 예) 등록박스 입수량 : 30 / 실제 입고 수량 : 25</>,
      image: '/COLD-FIELD/pack4.png'
    },
    {
      id: '5', title: '출고 단위에 맞는 포장 기준을 준수해주세요',
      detailDesc: <>- <b>낱개 단위 출고:</b> 낱개 출고 상품(SKU)은 개별 단위로 입고되어야 합니다. 번들 또는 묶음 단위로 입고될 경우 해체 후 입고 가능하며, 해체 비용이 발생합니다.<br/><br/>- <b>세트 단위 출고:</b> 세트로 구성된 상품(SKU)은 세트로 포장된 상태로 입고되어야 합니다.<br/><br/>- <b>송장 단위 출고:</b> 상품(SKU)에 송장을 바로 부착하여 출고하는 경우 박스 입수량 1개 단위로 입고되어야 합니다.</>,
      image: '/COLD-FIELD/pack5.png'
    },
    {
      id: '6', title: '아웃박스에는 필수 정보를 기재해주세요',
      detailDesc: <>- <b>낱개 단위 출고:</b> SKU명 / 박스입수량 / 바코드 숫자 표기 / 제조LOT / 소비기한<br/>- <b>세트 단위 출고:</b> SKU명 / 박스입수량 / 바코드 숫자 표기 / 제조LOT / 소비기한<br/>- <b>송장 단위 출고:</b> SKU명 / 바코드 숫자 표기 / 제조LOT / 소비기한</>,
      image: '/COLD-FIELD/pack6.png'
    },
    {
      id: '7', title: 'P-BOX 입고시 벌크입고로 처리 됩니다.',
      detailDesc: 'P-BOX의경우 입고는 가능하나, 입수량 및 박스 정보를 확인하기 힘들기 때문에 벌크 입고로 처리 됩니다..',
      image: '/COLD-FIELD/pack7.png'
    },
  ];

  // ==========================================
  // [고객사용 데이터 3] 바코드 기준
  // ==========================================
  const barcodeRules = [
    {
      id: '1', title: '모든 상품(SKU)에는 바코드가 반드시 부착 또는 인쇄된 채로 입고해주세요',
      detailDesc: <>- 입고되는 모든 상품에는 식별 가능한 바코드가 반드시 있어야 합니다.<br/>- 상품(SKU)에 바코드가 인쇄 또는 미부착된 경우 별도의 바코드 부착 비용이 발생됩니다.</>,
      image: '/COLD-FIELD/bar1.png'
    },
    {
      id: '2', title: '바코드 미검수 상품(SKU)의 경우 별도 부착 없이 입고 가능합니다',
      detailDesc: <>- 바코드 검수가 필요하지 않은 상품(SKU)의 경우 바코드가 인쇄 또는 미부착되어있더라도 입고가 가능합니다.<br/>- 단, 재고 관리 비대상으로 운영되며 재고 loss 또는 과출고, 출고 누락이 발생하더라도 품고에서 책임지지 않습니다.</>,
      image: '/COLD-FIELD/bar2.png'
    },
    {
      id: '3', title: '흰색 바탕에 검은색 바코드로 입고해주세요',
      detailDesc: '이 외 바코드 인쇄, 부착등으로 인해 스캔이 불가할 경우 바코드 덧방 비용이 추가로 발생됩니다.',
      image: '/COLD-FIELD/bar3.png'
    },
    {
      id: '4', title: '1개의 상품(SKU)에는 1개의 바코드만 있어야합니다',
      detailDesc: <>- 1개의 상품(SKU)에 여러 개의 스캔 가능한 바코드가 있을 경우 덧방 작업을 진행 후 입고해야 하며<br/>- 이는 출고 작업 시 작업 오류가 발생될 수 있는 사항으로, 덧방 없이 입고될 경우 덧방 비용이 추가로 발생될 수 있습니다.</>,
      image: '/COLD-FIELD/bar4.png'
    },
    {
      id: '5', title: '단수 출고 상품(SKU) 바코드 기준',
      detailDesc: <>- 📦 <b>단수 출고 상품(SKU)란?</b> 상품(SKU) 자체에 송장을 부착하여 출고하는 상품입니다.<br/><br/>- 박스째 출고하는 단수 상품(SKU)의 경우 박스 외부에 스캔 가능한 바코드가 부착 또는 인쇄되어 있어야 합니다.<br/>- 폴리백, 안전봉투 형태로 구성된 단수 상품(SKU)의 경우 아웃박스를 사용하여 입고해야 합니다.<br/>- 단, 아웃박스 외부에는 스캔 가능한 바코드가 없어야 하며, 상품(SKU)명 / 바코드 넘버 / 박스 입수량이 반드시 명시되어야 합니다.</>,
      image: '/COLD-FIELD/bar5.png'
    },
    {
      id: '6', title: '낱개 출고 상품(SKU) 바코드 기준',
      detailDesc: <>- 낱개 출고 상품(SKU)의 경우 카톤박스 내 인박스로 구성되어 있을 경우, 인박스에는 스캔 가능한 바코드가 없어야 합니다.<br/>- 인박스에 스캔 가능한 바코드가 있을 시 인박스 기준으로 출고되는 상품(SKU)으로 오인지 될 수 있습니다.</>,
      image: '/COLD-FIELD/bar6.png'
    },
    {
      id: '7', title: '등록된 바코드 또는 상품(SKU)의 바코드와 스캔되는 바코드가 일치하는지 확인 후 입고해주세요',
      detailDesc: <>- 실물 바코드와 실제 스캐너로 스캔되는 바코드가 일치해야 합니다.<br/>- 불일치 시 덧방 등의 추가 작업이 발생될 수 있습니다.</>,
      image: '/COLD-FIELD/bar7.png'
    }
  ];

  // ==========================================
  // [현장용 데이터 1] 입차 및 온도 검수 (내용 수정 가능)
  // ==========================================
  const fieldMenu1Rules = [
    {
      id: '1', title: '입고 예약 내역 및 입고증 대조 확인',
      detailDesc: <>- 전산(바이스) 내 당일 입고 예약 건과 기사님이 제출한 입고증 내역을 대조합니다.<br/>- 미예약 차량 도착 시 담당 MD/운영팀 확인 후 회송 또는 대기 안내를 진행합니다.</>,
      image: ''
    },
    {
      id: '2', title: '차량 적재함 및 상품 심부/표면 온도 측정',
      detailDesc: <>- 도어 개방 직후 차량 내부 온도계 및 적외선 온도계로 상품 온도를 측정합니다.<br/>- 적정 온도 이탈 시 사진 증빙을 남기고 즉시 운영팀에 보고 후 회송 처리합니다.</>,
      image: ''
    },
    {
      id: '3', title: '팔레트 이동전표 수취 확인 (KPP / AJ)',
      detailDesc: <>- 하차 전 기사님으로부터 팔레트 이동전표를 반드시 수취합니다.<br/>- 이동전표 미지참 시 전표 발행 완료 전까지 하차를 보류합니다.</>,
      image: ''
    },
  ];

  // ==========================================
  // [현장용 데이터 2] 하차 및 외관 검수 (내용 수정 가능)
  // ==========================================
  const fieldMenu2Rules = [
    {
      id: '1', title: '소비기한 및 제조 LOT 잔여일수 확인',
      detailDesc: <>- 소비기한 기준 미달 상품(냉장 7일 이하, 냉동 10일 이하) 입고 여부를 확인합니다.<br/>- 동일 SKU 내 소비기한/LOT 혼재 시 현장에서 분리 적재 후 이슈를 공유합니다.</>,
      image: ''
    },
    {
      id: '2', title: '혼적 팔레트 1PLT-1SKU 분리 작업',
      detailDesc: <>- 한 팔레트에 여러 SKU가 혼적된 경우 상품별로 팔레트를 분리하여 검수합니다.<br/>- 팔레트 높이 160cm 초과 또는 비표준 팔레트 입고 시 부가비용 청구를 위해 사진을 촬영합니다.</>,
      image: ''
    },
  ];

  // ==========================================
  // [현장용 데이터 3] 바코드 및 실셈 작업 (내용 수정 가능)
  // ==========================================
  const fieldMenu3Rules = [
    {
      id: '1', title: '잔량 박스 및 벌크 입고 실셈 처리',
      detailDesc: <>- 최상단 잔량 표기 박스 및 육안 수량 확인 불가(P-BOX 등) 물량은 개봉하여 전수 실셈을 진행합니다.<br/>- 실셈 및 부가작업 발생 내역은 현장 작업일지에 기록합니다.</>,
      image: ''
    },
    {
      id: '2', title: '바코드 스캔 테스트 및 덧방 작업',
      detailDesc: <>- PDA 스캐너로 실제 바코드가 정상 스캔되는지 및 전산 등록 바코드와 일치하는지 확인합니다.<br/>- 다중 바코드 노출 또는 스캔 불가 시 기존 바코드 덧방 후 신규 라벨을 부착합니다.</>,
      image: ''
    },
  ];

  // ==========================================
  // [현장용 데이터 4] 전산 반영 및 적치 (내용 수정 가능)
  // ==========================================
  const fieldMenu4Rules = [
    {
      id: '1', title: '검수 완료 수량 전산(바이스) 입고 확정',
      detailDesc: <>- 실물 검수 수량과 전산 수량 일치 여부를 최종 확인 후 입고 확정 처리합니다.<br/>- 파손·과부족 발생 시 사진 증빙과 함께 특이사항을 등록합니다.</>,
      image: ''
    },
    {
      id: '2', title: '보관 온도대별 로케이션 적치 및 랩핑 확인',
      detailDesc: <>- 냉장/냉동 지정 보관 존으로 이동 전 팔레트 랩핑 상태를 최종 점검합니다.<br/>- 동일 SKU라도 입고일이 다를 경우 기존 팔레트와 합적하지 않고 별도 적치합니다.</>,
      image: ''
    },
  ];

  // 리스트 렌더링 헬퍼 컴포넌트
  const RuleList = ({ rules, label }) => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {rules.map((rule) => (
        <div key={rule.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px', border: '1px solid #f3f4f6', borderRadius: '12px', backgroundColor: 'white', transition: 'all 0.2s', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ backgroundColor: '#eef2ff', color: '#0a44e6', padding: '4px 10px', borderRadius: '8px', fontSize: '14px', fontWeight: 'bold' }}>
              {rule.id}
            </span>
            <span style={{ fontWeight: '500', color: '#1f2937', fontSize: '15px', lineHeight: '1.4' }}>
              {rule.title}
            </span>
          </div>
          <button 
            onClick={() => setSelectedRule({ ...rule, label })} 
            style={{ flexShrink: 0, padding: '8px 16px', backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px', cursor: 'pointer', fontSize: '14px', color: '#0a44e6', fontWeight: '500', marginLeft: '16px' }}
          >
            상세보기
          </button>
        </div>
      ))}
    </div>
  );

  const Badge = ({ type }) => {
    if (type === '필수') return <span style={{ display: 'inline-block', backgroundColor: '#eef2ff', color: '#0a44e6', padding: '4px 8px', borderRadius: '6px', fontSize: '13px', fontWeight: 'bold', marginRight: '8px' }}>필수 준수</span>;
    if (type === '비용') return <span style={{ display: 'inline-block', backgroundColor: '#fff7ed', color: '#ea580c', padding: '4px 8px', borderRadius: '6px', fontSize: '13px', fontWeight: 'bold', marginRight: '8px' }}>추가 비용</span>;
    return null;
  };

  // ------------------------------------------
  // 우측 메인 화면 렌더링 함수 (고객사용)
  // ------------------------------------------
  const renderCustomerContent = () => {
    if (activeMenuId === 1) {
      return (
        <div style={{ backgroundColor: 'white', borderRadius: '24px', padding: '40px 50px', minHeight: 'calc(100vh - 60px)', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '8px', color: '#0a44e6' }}></h2>
          <p style={{ color: '#6b7280', fontSize: '16px', marginBottom: '32px' }}>센터 기본 정보 및 입고 전 확인 사항입니다.</p>

          <div style={{ display: 'flex', gap: '24px', alignItems: 'stretch', marginBottom: '48px' }}>
            <div style={{ flex: '6', display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ backgroundColor: '#f8f9fa', borderRadius: '16px', padding: '24px' }}>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '17px', fontWeight: 'bold', margin: '0 0 14px 0', color: '#111' }}>
                  <Clock size={20} color="#0a44e6" /> 입고가능 시간 & 점심시간
                </h3>
                <p style={{ margin: '0 0 6px 0', fontSize: '15px', color: '#222' }}>
                  <strong>입고가능:</strong> 10시 ~ 18시
                </p>
                <p style={{ margin: '0 0 16px 0', fontSize: '15px', fontWeight: 'bold', color: '#e11d48' }}>
                  점심시간: 13시 ~ 14시 입고불가
                </p>
                <div style={{ backgroundColor: '#ffe4e6', borderRadius: '10px', padding: '14px 16px', fontSize: '13.5px', color: '#111', lineHeight: '1.6' }}>
                  센터 점심시간 중에는 하차 및 모든 입고 업무가 중단 됩니다.<br />
                  해당 시간 도착으로 인한 대기 발생시, 당사는 대기 비용에 대한 책임을 지지 않습니다.<br />
                  원활한 입고 를 위해 반드시 점심시간을 제외하고 도착할수 있도록 배차 관리 부탁드립니다.
                </div>
              </div>

              <div style={{ backgroundColor: '#f8f9fa', borderRadius: '16px', padding: '24px' }}>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '17px', fontWeight: 'bold', margin: '0 0 14px 0', color: '#111' }}>
                  <MapPin size={20} color="#0a44e6" /> 센터 주소
                </h3>
                <p style={{ margin: '0 0 8px 0', fontSize: '15px', color: '#222' }}>
                  <strong>도로명 :</strong> 경기도 용인시 처인구 양지면 중부대로 2465 케이로지스 B4
                </p>
                <p style={{ margin: 0, fontSize: '15px', color: '#222' }}>
                  <strong>지번 :</strong> 경기도 용인시 처인구 양지읍 제일리 453-10
                </p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div style={{ backgroundColor: '#f8f9fa', borderRadius: '16px', padding: '24px' }}>
                  <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '17px', fontWeight: 'bold', margin: '0 0 14px 0', color: '#111' }}>
                    <Package size={20} color="#0a44e6" /> 팔레트 코드
                  </h3>
                  <p style={{ margin: 0, fontSize: '15px', color: '#222' }}>AJ: / KPP:</p>
                </div>

                <div style={{ backgroundColor: '#f8f9fa', borderRadius: '16px', padding: '24px' }}>
                  <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '17px', fontWeight: 'bold', margin: '0 0 14px 0', color: '#111' }}>
                    <Phone size={20} color="#0a44e6" /> 담당자 정보
                  </h3>
                  <p style={{ margin: '0 0 6px 0', fontSize: '15px', color: '#222' }}>담당자명:</p>
                  <p style={{ margin: 0, fontSize: '15px', color: '#222' }}>연락처:</p>
                </div>
              </div>
            </div>

            <div style={{ flex: '4', display: 'flex' }}>
              <img
                src="/COLD-FIELD/center.png" 
                alt="센터 전경 사진" 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover', 
                  borderRadius: '16px', 
                  border: '1px solid #eaeaea',
                  display: 'block'
                }} 
              />
            </div>
          </div>

          <h3 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '20px', color: '#111', borderBottom: '2px solid #111', paddingBottom: '12px' }}>입고 전 확인 사항</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {centerPreChecks.map((check) => (
              <div key={check.id} style={{ backgroundColor: '#f8f9fa', borderRadius: '12px', padding: '24px', border: '1px solid #eaeaea' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                  <span style={{ backgroundColor: '#0a44e6', color: 'white', padding: '4px 10px', borderRadius: '8px', fontSize: '14px', fontWeight: 'bold' }}>
                    {check.id}
                  </span>
                  <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#111' }}>
                    {check.title}
                  </span>
                </div>
                <div style={{ color: '#374151', fontSize: '15px', lineHeight: '1.6', paddingLeft: '4px' }}>
                  {check.detailDesc}
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (activeMenuId === 2) {
      return (
        <div style={{ backgroundColor: 'white', borderRadius: '24px', padding: '40px 50px', minHeight: 'calc(100vh - 60px)', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '12px', color: '#111' }}>포장 기준 확인</h2>
          <p style={{ color: '#6b7280', fontSize: '15px', marginBottom: '32px' }}>안전하고 빠른 입고를 위해 포장 기준을 반드시 준수해 주세요.</p>
          <RuleList rules={packagingRules} label="포장 기준" />
        </div>
      );
    }

    if (activeMenuId === 3) {
      return (
        <div style={{ backgroundColor: 'white', borderRadius: '24px', padding: '40px 50px', minHeight: 'calc(100vh - 60px)', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '12px', color: '#111' }}>바코드 기준 확인</h2>
          <p style={{ color: '#6b7280', fontSize: '15px', marginBottom: '32px' }}>정확한 재고 관리를 위해 바코드 부착 기준을 꼭 확인해 주세요.</p>
          <RuleList rules={barcodeRules} label="바코드 기준" />
        </div>
      );
    }

    if (activeMenuId === 4) {
      return (
        <div style={{ backgroundColor: 'white', borderRadius: '24px', padding: '40px 50px', minHeight: 'calc(100vh - 60px)', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
          <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '12px', color: '#111' }}>입고 예약 규정</h2>
          <p style={{ color: '#6b7280', fontSize: '15px', marginBottom: '32px' }}>입고 전 예약 방법과 차량 입고 시 유의사항입니다.</p>
          
          <div style={{ marginBottom: '40px' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#0a44e6', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ backgroundColor: '#eef2ff', padding: '4px 10px', borderRadius: '8px' }}>1</span> 택배 입고
            </h3>
            <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', padding: '20px', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px', color: '#991b1b', fontWeight: 'bold' }}>
              <AlertCircle size={20} /> 저온의 경우 택배 입고가 불가 합니다.
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: '18px', fontWeight: 'bold', color: '#0a44e6', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ backgroundColor: '#eef2ff', padding: '4px 10px', borderRadius: '8px' }}>2</span> 차량 입고
            </h3>
            
            <div style={{ backgroundColor: '#f8f9fa', padding: '24px', borderRadius: '12px', marginBottom: '24px' }}>
              <h4 style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '12px', color: '#111' }}>팔레트 내 다수 SKU 혼적 입고 시 유의 사항</h4>
              <ul style={{ margin: 0, paddingLeft: '20px', color: '#374151', fontSize: '14px', lineHeight: '1.7' }}>
                <li>품고의 입고 정책은 <b>1PLT-1SKU</b> 입니다. 불가피하게 혼적이 필요한 경우 상품(SKU) 간 혼재 방지를 위해 판지 구분 적재가 필요합니다.</li>
                <li style={{ color: '#6b7280', listStyleType: 'none', marginBottom: '8px' }}>➔ 판지를 보유하고 있지 않을 경우 육안으로 상품(SKU) 구별이 가능하도록 적재하여 입고해야합니다.</li>
                <li>입고 검수 시 1PLT-1SKU 기준으로 분리 작업이 진행됩니다.</li>
                <li>입고된 혼적 팔레트 채로 보관되지 않으며, 각 상품(SKU)별로 보관 공간에 적치됩니다.</li>
                <li>동일 상품(SKU)이더라도 입고일이 다를 경우 팔레트 합적 작업은 제공되지 않습니다.</li>
                <li style={{ color: '#0a44e6', fontWeight: 'bold' }}>이로 인해 소량으로 지속 입고할 경우, 보관료가 상승되므로 브랜드사의 보관료 절감을 위해 1PLT-1SKU = 완PLT 형태로 입고해주세요.</li>
              </ul>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ padding: '16px', border: '1px solid #e5e7eb', borderRadius: '12px', fontSize: '14px', lineHeight: '1.6' }}><Badge type="필수"/> 초도 입고 예정 상품의 패킹리스트를 먼저 제출해주세요.</div>
              <div style={{ padding: '16px', border: '1px solid #e5e7eb', borderRadius: '12px', fontSize: '14px', lineHeight: '1.6' }}><Badge type="필수"/> 차량 입고 예약은 영업일 기준 D-1 18시 이전까지 예약 가능합니다.<br/><span style={{ color: '#6b7280', display: 'inline-block', marginTop: '4px' }}>단, D-1 18시 이전이라도 입고 예약이 마감 된 경우에는 예약이 불가합니다.</span></div>
              <div style={{ padding: '16px', border: '1px solid #e5e7eb', borderRadius: '12px', fontSize: '14px', lineHeight: '1.6' }}><Badge type="필수"/> 모든 팔레트에는 입고증 첫 장과 팔레트 정보가 부착되어 있어야 합니다.</div>
              <div style={{ padding: '16px', border: '1px solid #e5e7eb', borderRadius: '12px', fontSize: '14px', lineHeight: '1.6' }}><Badge type="필수"/> 잔량 박스가 있을 경우, 팔레트 최상단 적재가 필요합니다.<br/><span style={{ color: '#6b7280', display: 'inline-block', marginTop: '4px' }}>육안으로 박스 외부에 잔량 박스 표기가 되어 있어야 합니다.</span></div>
              <div style={{ padding: '16px', border: '1px solid #e5e7eb', borderRadius: '12px', fontSize: '14px', lineHeight: '1.6' }}><Badge type="필수"/> 팔레트 적재 시 교대열 또는 벽돌형 적재로 입고해주세요.</div>
              <div style={{ padding: '16px', border: '1px solid #e5e7eb', borderRadius: '12px', fontSize: '14px', lineHeight: '1.6' }}><Badge type="필수"/> 잔량 팔레트로 입고하는 경우, 최상단 겉면을 비워 입고해주세요.<br/><span style={{ color: '#6b7280', display: 'inline-block', marginTop: '4px' }}>예시: 완 PLT 박스 수량 72박스 → 50박스 입고 시 최상단 중앙 비움이 아닌 겉면 비움으로 적재해야 하며, 최상단 비움 적재로 입고 시 외관상 박스 수량 오인이 발생할 수 있습니다.</span></div>
              <div style={{ padding: '16px', border: '1px solid #fca5a5', backgroundColor: '#fef2f2', borderRadius: '12px', fontSize: '14px', lineHeight: '1.6', color: '#991b1b', fontWeight: '500' }}><b>[입고 불가]</b> 팔레트 이동전표는 기사님을 통해 품고로 전달되어야 하며, 이동 전표 미발행 시 입고 불가합니다. (KPP: / AJ:)</div>
              <div style={{ padding: '16px', border: '1px solid #e5e7eb', borderRadius: '12px', fontSize: '14px', lineHeight: '1.6' }}><Badge type="비용"/> 팔레트 포함 높이 160cm 초과 시 박스 당 이적 추가 비용이 발생합니다. (부가 비용 참고)</div>
              <div style={{ padding: '16px', border: '1px solid #e5e7eb', borderRadius: '12px', fontSize: '14px', lineHeight: '1.6' }}><Badge type="비용"/> 표준 팔레트가 아닌 나무 또는 일회용 팔레트 입고 시 표준 팔레트 이적이 진행되며, 팔레트 당 추가 비용이 발생합니다. (부가 비용 참고)</div>
              <div style={{ padding: '16px', border: '1px solid #e5e7eb', borderRadius: '12px', fontSize: '14px', lineHeight: '1.6' }}><Badge type="비용"/> 팔레트 미적재 상태로 차량 입고 시 박스 당 추가 비용이 발생합니다. (부가 비용 참고)</div>
              <div style={{ padding: '16px', border: '1px solid #e5e7eb', borderRadius: '12px', fontSize: '14px', lineHeight: '1.6' }}><Badge type="필수"/> 상품(SKU) 파손 방지를 위해 팔레트 랩핑은 단단하게 작업 후 입고해주세요.<br/><span style={{ color: '#6b7280', display: 'inline-block', marginTop: '4px' }}>파손품이 발견될 경우 입고 수량에서 제외되며, 요청에 따라 반출 또는 폐기로 진행합니다.</span></div>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  // ------------------------------------------
  // 우측 메인 화면 렌더링 함수 (현장 입고 가이드용)
  // ------------------------------------------
  const renderFieldContent = () => {
    const fieldMap = {
      1: {
        title: '입차 및 온도 검수 기준',
        desc: '현장 차량 도착 시 예약 확인 및 적정 온도 체크 기준입니다.',
        rules: fieldMenu1Rules,
        label: '입차 및 온도 검수'
      },
      2: {
        title: '하차 및 외관 검수 기준',
        desc: '하차 시 소비기한 확인 및 혼적 팔레트 분리 작업 기준입니다.',
        rules: fieldMenu2Rules,
        label: '하차 및 외관 검수'
      },
      3: {
        title: '바코드 및 실셈 작업 기준',
        desc: '잔량 박스 실셈 및 바코드 스캔·덧방 처리 현장 기준입니다.',
        rules: fieldMenu3Rules,
        label: '바코드 및 실셈 작업'
      },
      4: {
        title: '전산 반영 및 적치 기준',
        desc: '검수 완료 후 바이스 입고 확정 및 보관 존 이동 기준입니다.',
        rules: fieldMenu4Rules,
        label: '전산 반영 및 적치'
      },
    };

    const currentField = fieldMap[activeMenuId];

    return (
      <div style={{ backgroundColor: 'white', borderRadius: '24px', padding: '40px 50px', minHeight: 'calc(100vh - 60px)', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
        <div style={{ display: 'inline-block', backgroundColor: '#ecfdf5', color: '#059669', padding: '6px 12px', borderRadius: '8px', fontSize: '13px', fontWeight: 'bold', marginBottom: '12px' }}>
          현장 업무용 가이드
        </div>
        <h2 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '12px', color: '#111' }}>{currentField.title}</h2>
        <p style={{ color: '#6b7280', fontSize: '15px', marginBottom: '32px' }}>{currentField.desc}</p>
        <RuleList rules={currentField.rules} label={currentField.label} />
      </div>
    );
  };

  const currentMenuList = guideType === 'customer' ? customerMenuItems : fieldMenuItems;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f4f6f9', fontFamily: '"Pretendard", sans-serif' }}>
      
      {/* 좌측 사이드바 영역 */}
      <div style={{ width: '280px', padding: '30px 24px', flexShrink: 0 }}>
        <h1 style={{ fontSize: '18px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
          <span style={{ color: '#0046ff', fontSize: '16px' }}>poomgo.</span> 품고 저온입고 가이드
        </h1>

        {/* 👇 [고객사용 입고 가이드] / [현장 입고 가이드] 전환 버튼 영역 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', backgroundColor: '#e5e7eb', padding: '6px', borderRadius: '14px', marginBottom: '28px' }}>
          <button
            onClick={() => handleSwitchGuide('customer')}
            style={{
              width: '100%',
              padding: '11px 14px',
              borderRadius: '10px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 'bold',
              backgroundColor: guideType === 'customer' ? '#0a44e6' : 'transparent',
              color: guideType === 'customer' ? 'white' : '#4b5563',
              boxShadow: guideType === 'customer' ? '0 2px 6px rgba(10,68,230,0.25)' : 'none',
              transition: 'all 0.2s ease'
            }}
          >
            고객사용 입고 가이드
          </button>
          <button
            onClick={() => handleSwitchGuide('field')}
            style={{
              width: '100%',
              padding: '11px 14px',
              borderRadius: '10px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 'bold',
              backgroundColor: guideType === 'field' ? '#059669' : 'transparent',
              color: guideType === 'field' ? 'white' : '#4b5563',
              boxShadow: guideType === 'field' ? '0 2px 6px rgba(5,150,105,0.25)' : 'none',
              transition: 'all 0.2s ease'
            }}
          >
            현장 입고 가이드
          </button>
        </div>

        {/* 선택된 가이드에 따른 세부 메뉴 버튼 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {currentMenuList.map((menu) => {
            const isActive = menu.id === activeMenuId;
            const activeColor = guideType === 'customer' ? '#0a44e6' : '#059669';
            const badgeBg = guideType === 'customer' ? '#eef2ff' : '#ecfdf5';

            return (
              <div 
                key={menu.id} onClick={() => setActiveMenuId(menu.id)}
                style={{ 
                  display: 'flex', alignItems: 'center', gap: '16px', padding: '16px 20px', borderRadius: '12px', cursor: 'pointer',
                  backgroundColor: isActive ? activeColor : 'white', color: isActive ? 'white' : '#333',
                  boxShadow: isActive ? '0 4px 12px rgba(0,0,0,0.12)' : '0 1px 3px rgba(0,0,0,0.05)', fontWeight: isActive ? 'bold' : '500', transition: 'all 0.2s ease'
                }}
              >
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', fontSize: '13px', fontWeight: 'bold', backgroundColor: isActive ? 'rgba(255,255,255,0.2)' : badgeBg, color: isActive ? 'white' : activeColor }}>
                  {menu.id}
                </div>
                {menu.title}
              </div>
            );
          })}
        </div>
      </div>

      {/* 우측 메인 콘텐츠 영역 */}
      <div style={{ flex: 1, padding: '30px 30px 30px 0' }}>
        {guideType === 'customer' ? renderCustomerContent() : renderFieldContent()}
      </div>

      {/* 상세보기 모달 팝업 */}
      {selectedRule && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.4)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: 'white', width: '90%', maxWidth: '800px', borderRadius: '16px', padding: '40px', position: 'relative', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', maxHeight: '90vh', overflowY: 'auto' }}>
            
            <button onClick={() => setSelectedRule(null)} style={{ position: 'absolute', top: '24px', right: '24px', background: 'none', border: '1px solid #eee', borderRadius: '8px', padding: '8px', cursor: 'pointer' }}>
              <X size={20} color="#666" />
            </button>

            <div style={{ marginBottom: '24px' }}>
              <span style={{ backgroundColor: '#eef2ff', color: '#0a44e6', padding: '6px 12px', borderRadius: '20px', fontSize: '14px', fontWeight: 'bold' }}>{selectedRule.label} 상세</span>
              <h2 style={{ fontSize: '22px', fontWeight: 'bold', marginTop: '16px', marginBottom: '8px', lineHeight: '1.4' }}>{selectedRule.title}</h2>
            </div>

            <div style={{ border: '1px solid #eaeaea', borderRadius: '12px', padding: '24px', marginBottom: '24px', backgroundColor: '#fafafa' }}>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '16px', fontWeight: 'bold', color: '#0a44e6', marginBottom: '12px', margin: 0 }}>
                <Info size={18} /> 상세 안내
              </h3>
              <div style={{ color: '#333', fontSize: '15px', lineHeight: '1.7', margin: 0 }}>
                {selectedRule.detailDesc}
              </div>
            </div>

            {selectedRule.image !== undefined && (
              <div style={{ width: '100%', marginTop: '20px', textAlign: 'center' }}>
                {selectedRule.image ? (
                  <img 
                    src={selectedRule.image} 
                    alt="상세 설명 이미지" 
                    style={{ 
                      width: '100%', 
                      height: 'auto',
                      objectFit: 'contain',
                      borderRadius: '12px', 
                      display: 'block', 
                      border: '1px solid #eaeaea' 
                    }} 
                  />
                ) : (
                  <div style={{ width: '100%', aspectRatio: '16/9', backgroundColor: '#f8f9fa', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', border: '1px solid #eaeaea' }}>
                    사진을 등록해주세요
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
}