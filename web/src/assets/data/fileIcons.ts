import DOCX from '../icons/files/DOCX.svg';
import JPG from '../icons/files/JPG.svg';
import TXT from '../icons/files/TXT.svg';
import XLS from '../icons/files/XLS.svg';
import PDF from '../icons/files/PDF.svg';
import PPT from '../icons/files/PPT.svg';
import MP3 from '../icons/files/MP3.svg';
import MP4 from '../icons/files/MP4.svg';
import MOV from '../icons/files/MOV.svg';
import AVI from '../icons/files/AVI.svg';
import GIF from '../icons/files/GIF.svg';
import PNG from '../icons/files/PNG.svg';
import RAW from '../icons/files/RAW.svg';

interface IFileIcons {
    [index: string]: string,
}

export const fileIcons: IFileIcons = {
    'DOCX': DOCX,
    'JPG': JPG,
    'TXT': TXT,
    'XLS': XLS,
    'XLSX': XLS,
    'PDF': PDF,
    'PPT': PPT,
    'PPTX': PPT,
    'MP3': MP3,
    'MP4': MP4,
    'MOV': MOV,
    'AVI': AVI,
    'GIF': GIF,
    'PNG': PNG,
    'RAW': RAW,
};