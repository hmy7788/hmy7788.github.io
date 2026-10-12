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
  github: string;
  demo?: string;
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
  },
];
