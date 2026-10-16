export type DataTable = {
  headers: string[];
  rows: string[][];
  note?: string;
};

export type Troubleshooting = {
  problem: string;
  causes: string[];
  solution: string;
};

export type Project = {
  title: string;
  period: string;
  role: string;
  stack: string[];
  summary: string;
  overview: string[];
  defectTypeTable?: DataTable;
  keyImplementation: string[];
  resultsTable?: DataTable;
  locationTable?: DataTable;
  extraTables?: { title: string; table: DataTable }[];
  troubleshooting?: Troubleshooting;
  insights?: string[];
  github?: string;
  demo?: string;
  pdf?: string;
  images: { src: string; alt: string }[];
};

export const projects: Project[] = [
  {
    title: '지도학습 CNN 기반 나사 결함 탐지 모델 성능 비교',
    period: '2026.02 – 2026.05',
    role: '개인 · 졸업논문 프로젝트',
    stack: ['Python', 'PyTorch', 'Scikit-learn', 'Matplotlib'],
    summary:
      '제조업 나사 불량 검출을 위해 CNN 3종을 동일 조건에서 비교하고, 불량 미검출(FN) 최소화를 목표로 F2-Score를 핵심 평가 지표로 설계했습니다.',
    overview: [
      '제조업 나사의 불량 검출을 위해 CNN 3종 모델을 동일 조건(동일 데이터셋, 동일 하이퍼파라미터)에서 비교 실험',
      '불량 미검출(False Negative) 최소화를 핵심 목표로 설정하여 단순 정확도 대신 F2-Score를 주요 평가 지표로 설계',
    ],
    defectTypeTable: {
      headers: ['타입', '설명'],
      rows: [
        ['Type 1', '나사 끝 휘어짐 / 부러짐'],
        ['Type 2', '나사 머리 깨짐'],
        ['Type 3', '나사 목 깨짐'],
        ['Type 4', '나사 산 깨짐 (측면 부분)'],
        ['Type 5', '나사 산 깨짐 (윗면 부분)'],
      ],
    },
    keyImplementation: [
      '클래스 불균형 해결을 위해 Weighted Cross Entropy Loss 적용',
      '불량 클래스 가중치 최적화 기법으로 Grid Search(1.0~5.0) 적용',
      '데이터 부족 해결 및 Data leakage 방지를 위해 Stratified 5-Fold CV 평가와 데이터 증강 기법 사용',
      'Grad-CAM 시각화로 모델 판단 근거 검증',
    ],
    resultsTable: {
      headers: ['모델', 'F2-Score', 'FPS', '비고'],
      rows: [
        ['ResNet-18', '0.8854', '88.8', '정확도, 속도 모두 우수'],
        ['MobileNet-V2', '0.6667', '82.9', ''],
        ['VGG-16', '0.5046', '24.2', '정확도, 속도 모두 최저'],
      ],
    },
    locationTable: {
      headers: ['불량 클래스', 'AUPRO', '비고'],
      rows: [
        ['Type 1', '0.7429', '형태(휘어짐)+약한 텍스처 혼재 → 결함 일부만 포착'],
        ['Type 2', '0.8822', '스크래치 질감 뚜렷 → 결함 위치 비교적 정확히 포착'],
        ['Type 3', '0.9224', '파임 질감 뚜렷 → 결함 위치 비교적 정확히 포착'],
        ['Type 4', '0.4489', '나사산 파손(순수 형태 결함, 텍스처 신호 없음) → 위치 못 잡음'],
        ['Type 5', '0.9520', '질감 변화 가장 뚜렷 → 위치추정 가장 우수'],
      ],
      note: '평균 AUPRO: 0.8142',
    },
    troubleshooting: {
      problem: 'Grad-CAM 시각화 결과, 일부 불량 유형(Type 4)에서 Attention 부위에 노이즈가 많았음',
      causes: [
        '결함 이미지가 유형별 20장뿐 → 미세 결함을 학습하기엔 데이터 절대량 부족',
        '지도학습 CNN은 텍스처 기반 결함엔 강하지만, 휘어짐·측면 파손처럼 형태·시점에 따라 달라지는 공간적 결함은 구조적으로 잘 잡아내지 못함',
      ],
      solution: '정상 이미지만으로 학습 가능한 비지도 이상탐지(PatchCore)로 접근 전환',
    },
    insights: [
      '단순 정확도보다 도메인에 맞는 평가 지표 설계가 더 중요함을 체득',
      '소규모 데이터·제조 도메인 특성상 모델 크기와 구조 선택이 성능에 결정적 영향을 미침을 확인',
      '지도학습 특성상 불량 데이터가 충분해야 학습 가능 → 실제 제조 현장 적용의 현실적 제약을 확인',
    ],
    github: 'https://github.com/hmy7788/screw_defect',
    images: [{ src: '/images/project1-gradcam.png', alt: 'ResNet-18 Grad-CAM 시각화 결과' }],
  },
  {
    title: '비지도 PatchCore 기반 나사 결함 검출 & 라인 관제 시스템',
    period: '2026.05 – 2026.06',
    role: '개인 프로젝트',
    stack: ['Python', 'PyTorch', 'PatchCore (anomalib)', 'Streamlit', 'SQLite'],
    summary:
      '졸업 프로젝트에서 확인한 불량 데이터 희소 문제를, 정상 데이터만으로 학습하는 비지도 이상탐지로 해결하고 미니 MES까지 구현했습니다.',
    overview: [
      '졸업 프로젝트에서 확인한 불량 데이터 희소 문제를, 정상 데이터만으로 학습하는 비지도 이상탐지로 해결',
      '결함 검출부터 위치 국소화, 라인 관제 UI, 결과 DB까지 미니 MES 개발',
    ],
    keyImplementation: [
      'PatchCore: 정상 샘플만으로 메모리뱅크 구성, 패치 단위 K-NN 이상 점수(anomaly score) 계산',
      '결함 위치 히트맵으로 불량 부위 시각화',
      'coreset × 해상도를 기준하여 AUPRO, FPS 비교',
    ],
    resultsTable: {
      headers: ['모델 (coreset 비율/해상도)', '평균 AUPRO', 'FPS', '비고'],
      rows: [
        ['cs01/320', '0.966', '13.1', '위치 탐지가 가장 높으나, 추론 속도 느림'],
        ['cs001/320', '0.956', '28.0', '위치 탐지, 속도 트레이드오프 가장 최적'],
        ['cs01/256', '0.941', '20.4', ''],
        ['cs001/256', '0.904', '30.4', '빠르나 상대적으로 위치 탐지 약함'],
      ],
    },
    troubleshooting: {
      problem: '모델 내장 임계값(0.5)으로 판정하니 정상 나사를 불량으로 많이 오탐(FP 16/41)',
      causes: ['기본 임계값은 정상/불량 분포의 통계적 균형점일 뿐 → 불량 출하가 치명적인 제조 현장 도메인과 불일치'],
      solution: 'test셋에서 F2-Score가 최대가 되는 임계값(0.513)을 재탐색 → Recall 0.992(FN 1) 확보',
    },
    insights: [
      '데이터 희소 환경에서는 비지도 이상탐지가 지도학습보다 현실적인 대안임을 구현으로 체득',
      '졸업 프로젝트에서 발견한 한계에서 출발해 문제 정의 → 해결 → 시스템화까지 전 과정을 직접 수행',
      '실제 현장은 조명·각도 등 환경 변수가 있어 실제 도메인 데이터로 재학습·재검증이 필요',
    ],
    github: 'https://github.com/hmy7788/screw-defect-mes',
    images: [
      { src: '/images/project2-heatmap.png', alt: '결함 위치 히트맵 및 불량 판단 Threshold' },
      { src: '/images/project2-mes.jpg', alt: '미니 MES 관제 시스템 화면' },
    ],
  },
  {
    title: '에어컨 다품종 대량 주문 대응 셀 생산라인 설계 (CPS)',
    period: '2026.08.04',
    role: '팀(5인) · 현대오토에버 모빌리티 SW스쿨 4기 교육 프로젝트',
    stack: ['S-Prodis', '3D 시뮬레이션', '라인 밸런싱', 'UPH · UPPH · UPMH 분석', '경제성 분석'],
    summary:
      '유럽발 에어컨 5,000대 대량 주문을 가정해, 라인 방식 공장의 병목을 시뮬레이션으로 진단하고 다기능 작업자 기반 셀 생산으로 재설계한 프로젝트입니다. 시간당 생산량(UPH)을 1.98에서 6.94까지 높였고, 병목 공정에 장비를 추가하는 TO-BE-B 레이아웃 설계와 실험을 담당했습니다.',
    overview: [
      '폭염으로 고효율·이동식·저가형 에어컨 총 5,000대 주문이 들어왔지만, AS-IS 라인은 시간당 약 2대(2,500시간, 약 105일)로 납기 대응 불가. 공장 확장과 추가 채용이 어려운 제약에서 기존 인원을 다기능 작업자로 훈련하는 셀 생산 방식을 도입',
      '3단계 비교: AS-IS(기존 라인) → TO-BE-A(셀 생산 + 다기능 작업자) → TO-BE-B(셀 1개·작업자 3명 추가 + 병목 장비 증설)',
      '담당: TO-BE-B 레이아웃 설계 및 실험 (AS-IS · TO-BE-A 분석은 다른 팀원 담당)',
      '하루(9:00–15:30) 일정의 교육 프로그램 내 팀 프로젝트로, 실제 공장이 아닌 시뮬레이션 상의 가상 공장 기준',
    ],
    keyImplementation: [
      'AS-IS 진단: 8개 공정 라인을 시뮬레이션해 작업자·AGV 동선 교차점 6개, 조립 담당 작업자 부하율 약 100%, 라인밸런싱 계획 69.17% 대비 실적 22.89% 확인',
      'TO-BE-A: 작업자 1명이 가공 → 압축 → 조립을 전담하는 셀 방식으로 교차점 6개 → 0개. 부하율이 낮던 SETUP 담당자를 셀 내부로 포함하고, 6명을 A셀 4명·B셀 1명·C셀 1명으로 재배치(B셀은 비수기에 A셀로 합류)',
      'TO-BE-B (담당): 셀 1개와 작업자 3명을 추가 투입한 Layout1에서 UPH 5.98. SETUP · 검사 · 포장 공정의 장비 가동률이 약 99%로 포화된 것을 확인하고, 해당 공정에 장비를 1대씩 추가한 Layout2에서 UPH 6.94 달성',
      'UPH · UPPH(인당) · UPMH(설비당) 지표와 연간 생산량·이익·설비비 회수 기간을 함께 비교해 안별 효율과 경제성 평가',
    ],
    resultsTable: {
      headers: ['지표', 'AS-IS', 'TO-BE-A', 'TO-BE-B (담당)'],
      rows: [
        ['UPH (시간당 생산량)', '1.98', '5.01', '6.94'],
        ['작업자 부하율', '36.5%', '94.7%', '87.0%'],
        ['장비 가동률', '27.6%', '69.7%', '64.4%'],
        ['라인밸런싱 (실적)', '22.89%', '57.92%', '50.13%'],
        ['리드타임', '2일 1시간 57분', '10시간 1분', '13시간 50분'],
        ['작업자 수', '6명', '6명', '9명'],
        ['작업자-AGV 동선 교차점', '6개', '0개', '0개'],
      ],
      note: 'S-Prodis 시뮬레이션 기준. TO-BE-A는 UPH 약 2.5배, 작업자 부하율 약 2.6배 개선',
    },
    extraTables: [
      {
        title: '경제성 분석 (시뮬레이션 가정 기준)',
        table: {
          headers: ['항목', 'AS-IS', 'TO-BE-A', 'TO-BE-B (담당)'],
          rows: [
            ['초기 설비 비용', '6억 3,000만원', '6억 3,000만원', '8억 1,000만원'],
            ['연간 이익 (판매이익 − 작업자 급여)', '7,560만원', '6억 8,220만원', '10억 1,880만원'],
            ['설비비 회수 기간', '8.44년', '0.92년', '0.79년'],
          ],
          note: '가정: 개당 판매이익 25만원, 전담 작업자 급여 2,500만원 · 다기능 작업자 급여 3,500만원, 하루 12시간 가동',
        },
      },
    ],
    troubleshooting: {
      problem: 'TO-BE-B에서 셀 1개와 작업자 3명을 추가했는데도 UPH가 5.98에 그침',
      causes: [
        'SETUP · 검사 · 포장 공정의 장비 가동률이 약 99%로 포화 → 인원을 늘려도 장비 1대가 처리량의 상한이 되는 병목',
      ],
      solution:
        '병목 공정에 장비를 1대씩 추가한 Layout2로 재실험 → UPH 6.94로 상승, 간트차트에서 SETUP · 검사 · 포장의 대기가 줄어든 것을 확인',
    },
    insights: [
      '인원 추가만으로는 처리량이 오르지 않고, 병목 공정의 장비 가동률부터 확인해야 한다는 점을 시뮬레이션으로 체득',
      '효율의 트레이드오프: TO-BE-B는 UPH가 가장 높지만(6.94) 인당 생산량 UPPH는 0.835 → 0.771, 설비당 생산량 UPMH는 0.358 → 0.347로 TO-BE-A보다 낮아, 목표(납기 vs 투자 효율)에 따라 선택이 달라짐',
      '모든 수치는 가상 공장 시뮬레이션 값이며, 실제 적용에는 다기능 작업자 교육·숙련 기간과 설비 현장 여건을 함께 고려해야 함',
      'TO-BE-B는 실습 시간이 부족해 셀 구성을 충분히 다듬지 못한 점이 아쉬움',
    ],
    images: [
      { src: '/images/cps-01-asis-layout.jpg', alt: 'AS-IS 공장 레이아웃과 공정 흐름 (부품입고 → 제품보관, 8개 공정)' },
      { src: '/images/cps-02-asis-traffic.jpg', alt: 'AS-IS 문제: 작업자 동선과 AGV 동선 교차점 6개' },
      { src: '/images/cps-03-asis-workload.jpg', alt: 'AS-IS 문제: 조립 담당 작업자 C 부하율 약 100%' },
      { src: '/images/cps-04-asis-lob.jpg', alt: 'AS-IS 문제: 라인밸런싱 계획 69.17% 대비 실적 22.89%' },
      { src: '/images/cps-05-tobea-cell.jpg', alt: 'TO-BE-A: 셀 생산 방식 도입으로 교차점 6개 → 0개' },
      { src: '/images/cps-06-tobeb-uph.jpg', alt: 'TO-BE-B: 병목 공정 장비 추가 후 UPH 6.94, 간트차트에서 병목 감소' },
      { src: '/images/cps-07-tobeb-3d.jpg', alt: 'TO-BE-B 3D 시뮬레이션 레이아웃과 TO-BE-A 대비 지표 변화' },
      { src: '/images/cps-08-summary.jpg', alt: '종합 지표 비교 (AS-IS · TO-BE-A · TO-BE-B)' },
      { src: '/images/cps-09-profit.jpg', alt: '연간 누적 수익 비교 (10년, 억원)' },
    ],
    pdf: '/files/cps-presentation.pdf',
  },
  {
    title: '설비 진동 신호 처리 기반 회전기기 결함 진단 (PHM)',
    period: '2026.08.11',
    role: '팀(5인) · 현대오토에버 모빌리티 SW스쿨 4기 교육 프로젝트',
    stack: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'VibLow Master', 'FFT'],
    summary:
      '회전기기 진동 raw data를 Python으로 시간 파형(TWF) · FFT · 속도 스펙트럼으로 변환하고, 계산한 결함 주파수(GMF, BPFI 등)와 피크를 대조해 FAN 불평형부터 베어링·기어 손상까지 원인을 진단한 실습입니다. 신호 처리 알고리즘 설계를 담당했습니다.',
    overview: [
      'FAN · 감속기(커플링) · 3상 모터 · 베어링 · 기어 등 회전기기 요소별로 결함이 어떤 주파수 성분으로 나타나는지 학습하고, 실제 실습 장비의 진동 데이터를 진단',
      '진단 흐름: 데이터 수집(VibLow Master) → 신호 처리(TWF · FFT, Python) → 결함 주파수 추출 · 물리적 현상 해석 → 상태 평가',
      '담당: 신호 처리 알고리즘 설계, 3상 모터 · 베어링(실습 3)과 장비 2(실습 4: 기계적 헐거움 · 윤활 · 기어) 주파수 분석 (데이터 수집 · 설비 파라미터 계산은 다른 팀원 담당)',
      '하루(8/11) 일정의 교육 프로그램 내 실습 프로젝트이며, 일부 결함은 실습 장비에서 모사한 상태',
    ],
    keyImplementation: [
      'CSV → TWF: 컬럼 정제 후 시간[s]과 가속도[g] 추출, 샘플링 주기 · 주파수를 계산해 시간 영역 파형 시각화 (8,192 샘플)',
      'TWF → FFT: Hanning 윈도우와 진폭 보정계수 적용, rfft로 단측 진폭 스펙트럼 계산',
      '속도 스펙트럼 변환: g → m/s² 변환(9.80665) 후 주파수 영역 1/ω 적분, 저주파 발산을 막기 위한 Cutoff 2.0Hz 적용, RMS · 윈도우 보정을 거쳐 mm/s로 변환하고 피크 검출',
      '결함 주파수 대조: 회전주파수 × 잇수로 GMF, 베어링 계수로 BPFI · BPFO · BSF · FTF를 계산해 스펙트럼 피크와 비교',
      '진단 근거 교차 확인: 하모닉 존재 여부, GMF 주변 ±회전주파수 사이드밴드, TWF의 충격 반복 간격(1/회전주파수)',
    ],
    resultsTable: {
      headers: ['실습', '관찰 근거', '진단'],
      rows: [
        ['FAN 불평형', '정상 대비 결함 데이터에서 1X 성분이 모든 단에서 증가 (3단 0.647 → 8.118), 2X · 3X는 1X보다 낮음', '불평형'],
        ['감속기 GMF', '607Hz를 1X GMF로 판단(최대 진폭, 1~4X 하모닉), 1X · 4X 주변 ±24Hz 사이드밴드', '커플링 마모 · 유격 (가속도 RMS 0.615g, 속도 RMS 2.91mm/s, 초중기)'],
        ['3상 모터 (정상 데이터)', '120Hz(전원 주파수 2배) 성분과 배수, 700Hz 로터 슬롯 고조파', '기계적 결함이 아닌 전자기적 원인'],
        ['베어링', '120Hz 피크 0.038 (정상 0.009의 약 4배), BPFI 계산값 27Hz × 4.450 = 120.15Hz와 일치', '베어링 내륜 결함'],
        ['장비 2 · 1번 모터', '저주파 대역 진동 집중, GMF2 하모닉이 고차로 갈수록 진폭 증가', '3번 축 기계적 헐거움(Loose)'],
        ['장비 2 · 2번 모터', '윤활 제거 전후 FFT 비교: 총진동(RMS)은 0.12 → 0.10mm/s로 소폭 감소, 1800~2200Hz 고주파 대역 진폭 증가', '윤활 부족 (에너지가 고주파 대역으로 재분배)'],
        ['장비 2 · 3번 모터', '410Hz(GMF1 + 2FL) 주변 ±29Hz 사이드밴드, TWF에서 34~35ms 간격(1/29Hz) 충격 반복', '모터측 10T 피니언 손상 의심'],
      ],
      note: '실습 장비 진동 데이터 기준. 정상 데이터와의 비교와 설비 제원 기반 계산값으로 진단',
    },
    troubleshooting: {
      problem: '가속도 스펙트럼을 속도 스펙트럼으로 바꾸는 1/ω 적분에서 DC · 저주파 성분이 발산',
      causes: ['1/ω 적분은 0Hz에 가까울수록 값이 커져, 직류와 저주파 노이즈가 속도 스펙트럼을 왜곡'],
      solution: 'Cutoff 2.0Hz 이하를 제거한 뒤 적분하고 RMS · 윈도우 보정을 적용해 mm/s 단위의 속도 스펙트럼과 피크를 안정적으로 검출',
    },
    insights: [
      '피크 하나로 단정하지 않고 계산한 결함 주파수, 하모닉, 사이드밴드, TWF 충격 간격을 교차 확인해 진단 근거를 쌓는 흐름을 체득',
      '윤활을 제거했을 때 총진동은 오히려 소폭 감소하고 에너지가 고주파 대역으로 이동 → 전체 진폭 크기만이 아니라 주파수 대역별 분포를 봐야 함을 확인',
      'Envelope 분석 등 다양한 지표는 적용하지 못해 추후 보완 과제, 정상 · 결함 기준과 이상 판정 자동화는 구현하지 않은 실습 수준의 분석',
    ],
    images: [
      { src: '/images/phm-01-fan-unbalance.jpg', alt: '실습 1 · FAN 불평형: 정상 대비 결함 데이터의 1X 성분 증가 (3단 0.647 → 8.118)' },
      { src: '/images/phm-02-fft-gmf.jpg', alt: '실습 2 · FFT: 607Hz를 1X GMF로 판단, 1~4X 하모닉 존재' },
      { src: '/images/phm-03-sideband.jpg', alt: '실습 2 · 1X · 4X GMF 주변 ±24Hz 사이드밴드' },
      { src: '/images/phm-04-velocity.jpg', alt: '실습 2 · 속도 스펙트럼(0~1000Hz): 1X 회전주파수 24Hz와 1X GMF' },
      { src: '/images/phm-05-bearing.jpg', alt: '실습 3 · 베어링 내륜 결함: 120Hz 피크가 BPFI 계산값(120.15Hz)과 일치' },
      { src: '/images/phm-06-loose.jpg', alt: '실습 4 · 장비 2 · 1번 모터: 3번 축 기계적 헐거움(Loose) 모사' },
      { src: '/images/phm-07-lubrication.jpg', alt: '실습 4 · 윤활유 제거 전후 FFT 비교: 고주파 대역으로 에너지 이동' },
      { src: '/images/phm-08-pinion.jpg', alt: '실습 4 · 3번 모터 시간 파형: 34~35ms 간격 충격 반복 → 피니언 손상' },
    ],
    pdf: '/files/phm-presentation.pdf',
  },
  {
    title: '비전 기반 작업자 오조립 방지 & 공정 검증 시스템 (AEGIS)',
    period: '2026.09.21 – 09.29',
    role: '팀(4인) · 현대오토에버 모빌리티 SW스쿨 4기 프로젝트',
    stack: ['Python', 'PyTorch', 'OpenCV', 'RT-DETR', 'YOLO-OBB', 'SQLite', 'MQTT'],
    summary:
      '다품종 조립 공정의 오조립을 카메라로 조립 중에 감지해 틀린 자리와 원인을 작업자 화면에 바로 표시하는 시스템입니다. 룰베이스의 한계를 수치로 확인한 뒤 딥러닝 검출 모델 3종을 같은 조건에서 비교했고, 룰베이스 검증과 RT-DETR 학습을 담당했습니다.',
    overview: [
      '다품종 조립 공정에서 부품·위치·방향 오조립을 카메라로 조립 중에 감지해 틀린 자리와 원인을 작업자 화면에 바로 표시. MES에서 작업지시를 받고 제품별 판정 결과를 MES로 보고',
      '담당: 룰베이스 검증, RT-DETR 학습, 조립 과정 평가 로직 고도화 (판정 코어, 웹 UI, MES 연동은 팀원 담당)',
      '교육 프로그램 내 팀 프로젝트로, 실습용 부품(나무 막대·볼트)과 고정 카메라·검은 배경 환경에서 구현·검증',
    ],
    keyImplementation: [
      '룰베이스 형태 검증: 컨투어로 막대 외곽선과 빈 구멍을 분리하고, 구멍 직선 피팅으로 회전 보정 후 막대별 구멍 개수 시그니처(예: [2,1])와 구멍 번호·볼트 색을 레시피와 대조해 Model A/B/C 판정. 틀리면 원인 텍스트 생성',
      '볼트가 꽂힌 완성품은 구멍이 하나의 덩어리로 합쳐져 Mother의 구멍을 직접 셀 수 없어, 세로 막대별 "접합점 위쪽 빈 구멍" 개수 기준으로 전환',
      'RT-DETR-L 학습: 단일 부품 → 조립체 → 픽킹·조립 진행 프레임 순으로 3차에 걸쳐 데이터를 980장까지 확장, YOLO11n-OBB·YOLO26n-OBB와 같은 test 149장으로 비교',
      '검출 모델 교체 구조(--model-type): 판정 로직을 모델·UI와 분리해 모델만 바꿔 같은 영상으로 공정 평가',
      '판정 상태 PASS / NG / HOLD / IN_PROGRESS, 같은 판정이 400ms 이상 유지될 때만 확정해 깜빡임 방지',
    ],
    resultsTable: {
      headers: ['모델', 'mAP50-95', '오류 사건 검출', '비고'],
      rows: [
        ['RT-DETR-L', '0.830', '7/7', '표시 상태 일치율 57.8%로 최고, CPU 2.3 FPS라 GPU 필요'],
        ['YOLO11n-OBB', '0.844', '6/7', 'H4→H5 위치 오류 1건 미검출'],
        ['YOLO26n-OBB', '0.877', '7/7', 'mAP 최고, 오경보 에피소드 4건으로 최저'],
      ],
      note: 'test 149장 기준, 오류 사건은 3분 47초 영상 7건 기준. RT-DETR은 일반 박스(AABB), YOLO 두 모델은 회전 박스(OBB)로 채점해 mAP는 참고용 비교',
    },
    extraTables: [
      {
        title: '룰베이스 정확도 (test 149장)',
        table: {
          headers: ['구분', '정답/전체', '비고'],
          rows: [
            ['완성품', '14/15 (93.3%)', '다른 모델로 오판 0건, 틀려도 보류로만 실패'],
            ['단일 부품', '84/84 (100%)', ''],
            ['피킹 영상', '23/50 (46%)', '손에 가려진 부품에 약함 → 딥러닝 검출 도입 근거'],
          ],
          note: '전체 정확도: 81.2%',
        },
      },
    ],
    troubleshooting: {
      problem:
        'RT-DETR이 2구멍 막대와 3구멍 막대를 같은 박스에 두 클래스로 동시 검출(conf 0.81 / 0.59). val mAP50은 0.99로 높아 지표만으로는 발견할 수 없었고, 샘플 직접 추론으로 확인',
      causes: ['구멍 개수만 다른 두 부품을 단일 부품 사진만으로는 구분 학습이 부족했던 것으로 추정'],
      solution:
        '완성 조립체 사진 100장을 추가 학습 → 2구·3구 모두 단일 정답만 검출(conf 0.97 / 0.98), 조립체의 부품 개수까지 정확히 검출',
    },
    insights: [
      '룰베이스의 한계를 수치로 확인한 뒤 딥러닝 3종을 동일 조건에서 비교해 선택하는 흐름을 체득',
      'val 지표가 높아도 실제 추론에서 클래스 혼동이 남을 수 있어, 직접 추론 확인이 필요함을 확인',
      '정상 완성품을 NG로 판정하는 오경보가 60초 중 19~23초 발생(세 모델 공통), 미완성품 PASS 오판은 0초 → 모델 교체보다 부품 연결·기하 판정 안정화가 우선 과제',
      '처리 속도는 오프라인 측정값(YOLO11만 GPU)이고 카메라→경고 지연은 미측정, 영상 1개·오류 사건 7건 기준의 시스템 수준 평가',
      'RT-DETR은 10 epoch만 학습해 추가 학습 효과는 미확인, 실습 환경 결과라 실제 현장 적용에는 재검증 필요',
    ],
    github: 'https://github.com/hmy7788/aegis-vision',
    demo: 'https://www.youtube.com/watch?v=MuZ7LdKFj_c',
    images: [
      { src: '/images/project3-ui-ng.jpg', alt: 'NG 판정 시 작업자 화면 (잘못 끼운 자리와 원인 표시)' },
      { src: '/images/project3-rulebased.png', alt: '룰베이스 검출 결과 (컨투어 · 구멍 개수 시그니처)' },
      { src: '/images/project3-models.png', alt: '검출 모델 3종 성능 비교' },
    ],
    pdf: '/files/aegis-presentation.pdf',
  },
];
