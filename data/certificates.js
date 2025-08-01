/**
 * Dados dos certificados
 * Centraliza as informações dos certificados em um único arquivo
 */

const certificatesData = {
    aws: [
        {
            id: 'aws-ccp',
            title: 'AWS Certified Cloud Practitioner',
            issuer: 'AWS',
            date: '22/11/2023',
            category: 'aws',
            image: 'https://images.credly.com/size/340x340/images/00634f82-b07f-4bbd-a6bb-53de397fc3a6/image.png',
            pdf: './src/assets/certificates/AWS Certified Cloud Practitioner certificate.pdf',
            credlyUrl: 'https://www.credly.com/badges/0f54fbd4-4a72-42f4-884a-5e80f6fb3ff3/public_url'
        },
        {
            id: 'aws-skill-builder',
            title: 'AWS Skill Builder Certificate',
            issuer: 'AWS',
            date: '20/01/2024',
            category: 'aws',
            image: './src/assets/certificates/aws-re-start-graduate.png',
            pdf: './src/assets/certificates/AWS Skill Builder Certificate.pdf'
        },
        {
            id: 'aws-developer',
            title: 'AWS Certified Developer Associate',
            issuer: 'AWS',
            date: 'Em progresso',
            category: 'aws',
            image: 'https://d1.awsstatic.com/training-and-certification/certification-badges/AWS-Certified-Developer-Associate_badge.5c083fa855fe82c1cf2d0c8b883c265ec72a17c0.png',
            inProgress: true,
            expectedDate: '09/2025'
        }
    ],
    educational: [
        {
            id: 'ia-fundamentos',
            title: 'Fundamentos da Inteligência Artificial',
            issuer: 'UniFatecie',
            date: '18/06/2024',
            category: 'education',
            image: 'https://images.unsplash.com/photo-1677442135136-760c813028c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80',
            pdf: './src/assets/certificates/Certificado IA.pdf'
        },
        {
            id: 'qa-software',
            title: 'Introdução a Qualidade de Software',
            issuer: 'DIO',
            date: '22/03/2022',
            category: 'development',
            image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80',
            pdf: './src/assets/certificates/Introduçao a QA.pdf'
        },
        {
            id: 'devops-aws',
            title: 'DevOps e AWS Solutions',
            issuer: 'kenerry serain',
            date: '06/06/2025',
            category: 'cloud',
            image: 'https://images.unsplash.com/photo-1607799279861-4dd421887fb3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
            imageFile: './src/assets/certificates/Semana Devops.png'
        },
        {
            id: 'multcloud',
            title: 'MultCloud',
            issuer: 'MultCloud',
            date: '15/04/2023',
            category: 'cloud',
            image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
            pdf: './src/assets/certificates/Multicloud.pdf'
        },
        {
            id: 'trabalhador-40',
            title: 'Trabalhador 4.0',
            issuer: 'Microsoft',
            date: '12/11/2023',
            category: 'education',
            image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
            pdf: './src/assets/certificates/Certificate_trabalhador4.0.pdf'
        },
        {
            id: 'inu-mais1code',
            title: 'Instituto Inu Mais1code',
            issuer: 'Mais1code',
            date: '05/03/2023',
            category: 'education',
            image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
            pdf: './src/assets/certificates/Inu Mais1code.pdf'
        },
        {
            id: 'lab-mindset',
            title: 'Lab Mindset mais1code',
            issuer: 'Mais1code',
            date: '10/04/2023',
            category: 'development',
            image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
            pdf: './src/assets/certificates/Lab Mindset mais1code.pdf'
        }
    ]
};

// Exportar os dados para uso em outros arquivos
if (typeof module !== 'undefined') {
    module.exports = { certificatesData };
}