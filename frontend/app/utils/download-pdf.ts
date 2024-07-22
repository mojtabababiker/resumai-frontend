'use client';
// get the resume props, create and download a pdf using the html2pdf library

export async function downloadPDF(userName: string) {
    const element = document.getElementById('resume-template');
    console.log(element);
    const opt = {
        margin: [0.3, 0.3],
        filename: `${userName}-resume.pdf`,
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
        pagebreak: {mode: ['avoid-all'], before: 'section'},
        // break: { before: ['section'] }
    };

    return window.html2pdf().from(element).set(opt).save(); /* eslint-disable-line */;
}