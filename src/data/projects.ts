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
  troubleshooting?: Troubleshooting;
  insights?: string[];
  github: string;
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
];
