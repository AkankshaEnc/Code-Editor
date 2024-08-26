document.addEventListener('DOMContentLoaded', () => {
    const htmlCode = document.getElementById('htmlCode');
    const cssCode = document.getElementById('cssCode');
    const jsCode = document.getElementById('jsCode');
    const previewFrame = document.getElementById('previewFrame');
    const tabButtons = document.querySelectorAll('.tab-button');
    const copyButtons = document.querySelectorAll('.copy-button');
    
    function updatePreview() {
        const html = htmlCode.value;
        const css = `<style>${cssCode.value}</style>`;
        const js = `<script>${jsCode.value}<\/script>`;
        const doc = `
            <html>
                <head>
                    <title>Preview</title>
                </head>
                <body>
                    ${html}
                    ${css}
                    ${js}
                </body>
            </html>
        `;
        previewFrame.contentDocument.open();
        previewFrame.contentDocument.write(doc);
        previewFrame.contentDocument.close();
    }
    
    htmlCode.addEventListener('input', updatePreview);
    cssCode.addEventListener('input', updatePreview);
    jsCode.addEventListener('input', updatePreview);
    
    function switchTab(event) {
        const tab = event.target.dataset.tab;
        
        tabButtons.forEach(button => {
            button.classList.toggle('active', button.dataset.tab === tab);
        });
        
        document.querySelectorAll('.code-container').forEach(editor => {
            editor.classList.toggle('active', editor.querySelector('.code-editor').id === `${tab}Code`);
        });
    }
    
    function copyCode(event) {
        const targetId = event.target.dataset.target;
        const codeEditor = document.getElementById(targetId);
        codeEditor.select();
        document.execCommand('copy');
        alert(`${targetId.toUpperCase()} code copied to clipboard!`);
    }
    
    tabButtons.forEach(button => {
        button.addEventListener('click', switchTab);
    });

    copyButtons.forEach(button => {
        button.addEventListener('click', copyCode);
    });
    
    // Set initial active tab
    document.querySelector('.tab-button.active').click();
});
