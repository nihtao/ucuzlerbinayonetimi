const fs = require('fs');

const langs = ['tr', 'en', 'de', 'es', 'fr', 'ar', 'zh'];

const kvkkExtras = {
  tr: {
    intro: 'Üçüzler Bina Yönetimi olarak, 6698 sayılı Kişisel Verilerin Korunması Kanunu ("KVKK") uyarınca kişisel verilerinizin güvenliğine, gizliliğine ve hukuka uygun şekilde işlenmesine en üst düzeyde önem veriyoruz.',
    sec1Desc: 'Sahabiye Mahallesi Ahmet Paşa Caddesi Kalender İş Merkezi 41/10 adresinde mukim Üçüzler Bina Yönetimi, KVKK kapsamında "Veri Sorumlusu" sıfatıyla hareket etmekte olup, kişisel verileriniz işbu Aydınlatma Metni\'nde açıklanan sınırlar çerçevesinde işlenmektedir.',
    sec2Desc: 'Kişisel verileriniz, şirketimiz tarafından sunulan yönetim hizmetlerinin eksiksiz bir şekilde ifa edilebilmesi amacıyla işlenmektedir. Başlıca işleme amaçlarımız şunlardır:',
    sec2Items: [
      'Aidat ve gider avansı tahsilat süreçlerinin yürütülmesi',
      'Bina, site ve iş merkezi güvenliğinin sağlanması',
      'Hukuki ve mali yükümlülüklerin eksiksiz yerine getirilmesi',
      'Sakinlerimize yönelik hizmet kalitesinin artırılması ve iletişimin sağlanması'
    ],
    sec3Desc: 'KVKK\'nın 11. maddesi uyarınca, veri sahibi olarak aşağıdaki yasal haklara sahipsiniz:',
    sec3Items: [
      'Kişisel veri işlenip işlenmediğini öğrenme',
      'İşlenmişse buna ilişkin bilgi talep etme',
      'İşlenme amacını ve amaca uygun kullanılıp kullanılmadığını öğrenme',
      'Eksik veya yanlış işlenen verilerin düzeltilmesini isteme',
      'Kanuna uygun olarak verilerin silinmesini talep etme',
      'Otomatik sistemler ile yapılan analizlere itiraz etme'
    ]
  },
  en: {
    intro: 'As Ucuzler Building Management, we attach the utmost importance to the security, confidentiality and lawful processing of your personal data in accordance with the Personal Data Protection Law No. 6698 ("KVKK").',
    sec1Desc: 'Ucuzler Building Management, located at Sahabiye Neighborhood Ahmet Pasha Street Kalender Business Center 41/10, acts as the "Data Controller" within the scope of KVKK, and your personal data is processed within the limits explained in this Clarification Text.',
    sec2Desc: 'Your personal data is processed by our company for the purpose of fully performing the management services we provide. Our main processing purposes are:',
    sec2Items: [
      'Managing collection processes for dues and expense advances',
      'Ensuring the security of buildings, sites and business centers',
      'Fulfilling legal and financial obligations completely',
      'Improving service quality for our residents and ensuring communication'
    ],
    sec3Desc: 'Pursuant to Article 11 of KVKK, as a data subject, you have the following legal rights:',
    sec3Items: [
      'Learning whether personal data is processed',
      'If processed, requesting information about it',
      'Learning the purpose of processing and whether it is used appropriately',
      'Requesting correction of incomplete or incorrectly processed data',
      'Requesting deletion of data in accordance with the law',
      'Objecting to analyses made through automated systems'
    ]
  },
  de: {
    intro: 'Als Ucuzler Gebäudeverwaltung legen wir größten Wert auf die Sicherheit, Vertraulichkeit und rechtmäßige Verarbeitung Ihrer personenbezogenen Daten gemäß dem Datenschutzgesetz Nr. 6698.',
    sec1Desc: 'Die Ucuzler Gebäudeverwaltung mit Sitz in Sahabiye Viertel, Ahmet Paşa Straße, Kalender Business Center 41/10, handelt im Rahmen des KVKK als "Verantwortlicher" und Ihre personenbezogenen Daten werden im Rahmen dieses Aufklärungstextes verarbeitet.',
    sec2Desc: 'Ihre personenbezogenen Daten werden von unserem Unternehmen verarbeitet, um die von uns angebotenen Verwaltungsdienstleistungen vollständig erbringen zu können. Unsere wichtigsten Verarbeitungszwecke sind:',
    sec2Items: [
      'Verwaltung von Inkassoprozessen für Gebühren und Kostenvorschüsse',
      'Sicherstellung der Sicherheit von Gebäuden, Anlagen und Geschäftszentren',
      'Vollständige Erfüllung rechtlicher und finanzieller Verpflichtungen',
      'Verbesserung der Servicequalität für unsere Bewohner und Sicherstellung der Kommunikation'
    ],
    sec3Desc: 'Gemäß Artikel 11 des KVKK haben Sie als betroffene Person folgende Rechte:',
    sec3Items: [
      'Erfahren, ob personenbezogene Daten verarbeitet werden',
      'Falls verarbeitet, Informationen darüber anfordern',
      'Den Zweck der Verarbeitung und die zweckgemäße Verwendung erfahren',
      'Berichtigung unvollständiger oder fehlerhaft verarbeiteter Daten verlangen',
      'Löschung von Daten gemäß dem Gesetz beantragen',
      'Widerspruch gegen durch automatisierte Systeme durchgeführte Analysen einlegen'
    ]
  },
  es: {
    intro: 'Como Ucuzler Administración de Edificios, otorgamos la máxima importancia a la seguridad, confidencialidad y procesamiento legal de sus datos personales de acuerdo con la Ley de Protección de Datos Personales No. 6698.',
    sec1Desc: 'Ucuzler Administración de Edificios, ubicada en el barrio Sahabiye, Calle Ahmet Paşa, Centro de Negocios Kalender 41/10, actúa como "Responsable del Tratamiento" dentro del alcance de KVKK, y sus datos personales se procesan dentro de los límites explicados en este Texto de Aclaración.',
    sec2Desc: 'Sus datos personales son procesados por nuestra empresa con el fin de prestar plenamente los servicios de gestión que ofrecemos. Nuestros principales propósitos de procesamiento son:',
    sec2Items: [
      'Gestión de procesos de cobro de cuotas y anticipos de gastos',
      'Garantizar la seguridad de edificios, sitios y centros de negocios',
      'Cumplimiento completo de obligaciones legales y financieras',
      'Mejorar la calidad del servicio para nuestros residentes y garantizar la comunicación'
    ],
    sec3Desc: 'De conformidad con el Artículo 11 del KVKK, como titular de datos, usted tiene los siguientes derechos:',
    sec3Items: [
      'Saber si los datos personales son procesados',
      'Si se procesan, solicitar información al respecto',
      'Conocer el propósito del procesamiento y si se utiliza adecuadamente',
      'Solicitar la corrección de datos incompletos o procesados incorrectamente',
      'Solicitar la eliminación de datos de acuerdo con la ley',
      'Oponerse a análisis realizados mediante sistemas automatizados'
    ]
  },
  fr: {
    intro: 'En tant que Ucuzler Gestion d\'Immeubles, nous accordons la plus grande importance à la sécurité, à la confidentialité et au traitement légal de vos données personnelles conformément à la Loi sur la Protection des Données Personnelles n° 6698.',
    sec1Desc: 'Ucuzler Gestion d\'Immeubles, situé au quartier Sahabiye, rue Ahmet Paşa, Centre d\'affaires Kalender 41/10, agit en tant que "Responsable du traitement" dans le cadre du KVKK, et vos données personnelles sont traitées dans les limites expliquées dans ce Texte de Clarification.',
    sec2Desc: 'Vos données personnelles sont traitées par notre société dans le but de fournir pleinement les services de gestion que nous proposons. Nos principaux objectifs de traitement sont:',
    sec2Items: [
      'Gestion des processus de recouvrement des charges et avances sur dépenses',
      'Assurer la sécurité des bâtiments, sites et centres d\'affaires',
      'Respect complet des obligations juridiques et financières',
      'Améliorer la qualité de service pour nos résidents et assurer la communication'
    ],
    sec3Desc: 'Conformément à l\'article 11 du KVKK, en tant que personne concernée, vous disposez des droits légaux suivants:',
    sec3Items: [
      'Savoir si des données personnelles sont traitées',
      'Si traitées, demander des informations à ce sujet',
      'Connaître la finalité du traitement et son utilisation appropriée',
      'Demander la correction de données incomplètes ou incorrectement traitées',
      'Demander la suppression de données conformément à la loi',
      'S\'opposer aux analyses effectuées par des systèmes automatisés'
    ]
  },
  ar: {
    intro: 'بوصفنا شركة أوجوزلار لإدارة المباني، نولي أهمية قصوى لأمان بياناتك الشخصية وسريتها ومعالجتها القانونية وفقًا لقانون حماية البيانات الشخصية رقم 6698.',
    sec1Desc: 'تعمل شركة أوجوزلار لإدارة المباني، المقيمة في حي صحابية، شارع أحمد باشا، مركز كالاندر التجاري 41/10، بوصفها "مسؤولة عن معالجة البيانات" في إطار القانون، وتتم معالجة بياناتك الشخصية ضمن الحدود الموضحة في هذا النص التوضيحي.',
    sec2Desc: 'تتم معالجة بياناتك الشخصية من قبل شركتنا بهدف تقديم خدمات الإدارة التي نوفرها بشكل كامل. وتتمثل أهم أغراض المعالجة فيما يلي:',
    sec2Items: [
      'إدارة عمليات تحصيل الرسوم والسلف على النفقات',
      'ضمان أمن المباني والمواقع والمراكز التجارية',
      'الوفاء الكامل بالالتزامات القانونية والمالية',
      'تحسين جودة الخدمة للسكان وضمان التواصل'
    ],
    sec3Desc: 'وفقًا للمادة 11 من القانون، بوصفك صاحب البيانات، تتمتع بالحقوق القانونية التالية:',
    sec3Items: [
      'معرفة ما إذا كانت البيانات الشخصية تُعالَج',
      'إذا كانت تُعالَج، طلب معلومات بشأنها',
      'معرفة الغرض من المعالجة ومدى الاستخدام الملائم',
      'طلب تصحيح البيانات غير المكتملة أو المعالجة بشكل خاطئ',
      'طلب حذف البيانات وفقًا للقانون',
      'الاعتراض على التحليلات المُجراة عبر الأنظمة الآلية'
    ]
  },
  zh: {
    intro: '作为Ucuzler建筑管理公司，我们高度重视依照第6698号个人数据保护法对您的个人数据进行安全、保密和合法处理。',
    sec1Desc: 'Ucuzler建筑管理公司，位于Sahabiye街区Ahmed Paşa街Kalender商业中心41/10，在KVKK范围内作为"数据控制方"运营，您的个人数据在本说明文本所解释的范围内进行处理。',
    sec2Desc: '我们公司处理您的个人数据是为了能够充分提供我们所提供的管理服务。我们的主要处理目的是：',
    sec2Items: [
      '管理费用和费用预付款的收取流程',
      '确保建筑、场地和商业中心的安全',
      '完全履行法律和财务义务',
      '提高对我们居民的服务质量并确保沟通'
    ],
    sec3Desc: '根据KVKK第11条，作为数据主体，您享有以下法定权利：',
    sec3Items: [
      '了解个人数据是否被处理',
      '如果被处理，请求相关信息',
      '了解处理目的及是否被适当使用',
      '要求更正不完整或错误处理的数据',
      '依法要求删除数据',
      '对通过自动化系统进行的分析提出异议'
    ]
  }
};

for (const lang of langs) {
  const filePath = `locales/${lang}/common.json`;
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  data.kvkkPage = { ...data.kvkkPage, ...kvkkExtras[lang] };
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log(`Updated kvkkPage for ${lang}`);
}
