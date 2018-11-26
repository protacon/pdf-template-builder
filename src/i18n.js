import * as i18n from 'i18next';
import { reactI18nextModule } from 'react-i18next';

i18n
  .use(reactI18nextModule)
  .init({
    lng: 'en',
    fallbackLng: 'en',
    resources: {
      en: {
        translation: {
          addElement: 'Add element',
          alignBottom: 'Align bottom',
          alignCenter: 'Align center',
          alignLeft: 'Align left',
          alignMiddle: 'Align middle',
          alignRight: 'Align right',
          alignTop: 'Align top',
          bindToProperty: 'Bind to property',
          bold: 'Bold',
          border: 'Border',
          borderColor: 'Border color',
          bottom: 'Bottom',
          color: 'Color',
          commonProperties: 'Common properties',
          content: 'Content',
          deleteThisElement: 'Delete {{type}}',
          doRedo: 'Redo',
          doSave: 'Save',
          doUndo: 'Undo',
          duplicateThisElement: 'Duplicate {{type}}',
          elementSettings: '{{type}} settings',
          freeText: 'Free text',
          group: 'Group',
          hideBorders: 'Hide element borders',
          hideGrid: 'Hide grid',
          image: 'Image',
          italic: 'Italic',
          landscape: 'Landscape',
          layoutRelative: 'Use relative layout',
          lineHeight: 'Line height',
          left: 'Left',
          pageBorder: 'Page border',
          pageSettings: 'Page settings',
          paperOrientation: 'Orientation',
          paperSize: 'Paper format',
          pdfTemplateBuilder: 'PDF template builder',
          portrait: 'Portrait',
          right: 'Right',
          saveFail: 'Save failed',
          saveSuccess: 'Template saved',
          showBorders: 'Show element borders',
          showGrid: 'Show grid',
          showPreview: 'Show preview',
          sizeAndOrientation: 'Size and orientation',
          text: 'Text',
          top: 'Top',
          underline: 'Underline',
          uploadImage: 'Upload image',
        }
      },
      fi: {
        translation: {
          addElement: 'Lisää elementti',
          alignBottom: 'Tasaa alas',
          alignCenter: 'Tasaa keskelle',
          alignLeft: 'Tasaa vasemmalle',
          alignMiddle: 'Tasaa keskelle',
          alignRight: 'Tasaa oikealle',
          alignTop: 'Tasaa ylös',
          bindToProperty: 'Sido arvo',
          bold: 'Lihavoi',
          border: 'Reunukset',
          borderColor: 'Reunuksen väri',
          bottom: 'Ala',
          color: 'Väri',
          commonProperties: 'Yleiset arvot',
          content: 'Sisältö',
          deleteThisElement: 'Poista {{type}}',
          doRedo: 'Tee uudelleen',
          doSave: 'Tallenna',
          doUndo: 'Kumoa',
          duplicateThisElement: 'Monista {{type}}',
          elementSettings: '{{type}}n asetukset',
          freeText: 'Vapaa teksti',
          group: 'Ryhmä',
          hideBorders: 'Piilota elementtien reunat',
          hideGrid: 'Piilota ruudukko',
          image: 'Kuva',
          italic: 'Kursivoi',
          landscape: 'Vaaka',
          layoutRelative: 'Asettele suhteellisesti',
          lineHeight: 'Rivikorkeus',
          left: 'Vasen',
          pageBorder: 'Sivun reunus',
          pageSettings: 'Sivun asetukset',
          paperOrientation: 'Sivun asettelu',
          paperSize: 'Paperin koko',
          pdfTemplateBuilder: 'PDF-pohjien rakennustyökalu',
          portrait: 'Pysty',
          right: 'Oikea',
          saveFail: 'Tallennus epäonnistui',
          saveSuccess: 'Pohja tallennettu',
          showBorders: 'Näytä elementtien reunat',
          showGrid: 'Näytä ruudukko',
          showPreview: 'Näytä esikatselu',
          sizeAndOrientation: 'Koko ja asettelu',
          text: 'Teksti',
          top: 'Ylä',
          underline: 'Alleviivaa',
          uploadImage: 'Lataa kuva',
        }
      }
    }
  });
