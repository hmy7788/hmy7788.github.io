export type Project = {
  title: string;
  period: string;
  role: string;
  stack: string[];
  summary: string;
  highlights: string[];
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
    highlights: [
      'ResNet-18이 F2-Score 0.8854 · 88.8 FPS로 정확도·속도 모두 최우수',
      '클래스 불균형 대응(Weighted Cross Entropy + Grid Search), Stratified 5-Fold CV, Grad-CAM으로 판단 근거 검증',
      'Type 4(형태 결함)에서 위치추정 취약점 발견 → 비지도 이상탐지(PatchCore)로 전환하는 계기가 됨',
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
    highlights: [
      'coreset 0.01 · 해상도 320 조합이 AUPRO 0.956 · FPS 28.0으로 정확도-속도 트레이드오프 최적',
      'F2-Score 기준 임계값(0.513) 재탐색으로 Recall 0.992(FN 1) 확보, 기본 임계값 대비 오탐 대폭 감소',
      'Streamlit + SQLite로 검사 자동화 · 실시간 관제 미니 MES 구축',
    ],
    github: 'https://github.com/hmy7788/screw-defect-mes',
    images: [
      { src: '/images/project2-heatmap.png', alt: '결함 위치 히트맵 및 불량 판단 Threshold' },
      { src: '/images/project2-mes.jpg', alt: '미니 MES 관제 시스템 화면' },
    ],
  },
];
