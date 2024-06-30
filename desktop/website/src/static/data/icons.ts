import DOCXIcon from '../../static/icons/DOCX.svg';
import JPGIcon from '../../static/icons/JPG.svg';
import TXTIcon from '../../static/icons/TXT.svg';
import XSLIcon from '../../static/icons/XLS.svg';
import PDFIcon from '../../static/icons/PDF.svg'

interface IFileIcons {
    [index: string]: string,
}

export const fileIcons: IFileIcons = {
    'DOCX': DOCXIcon,
    'JPG': JPGIcon,
    'TXT': TXTIcon,
    'XLS': XSLIcon,
    'XLSX': XSLIcon,
    'PDF': PDFIcon,
};