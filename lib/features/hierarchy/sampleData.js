export default {
  nodes: [
    { id: 'n1', label: 'Karel Novák', sex: 'M', status: 'živý', role: 'Manažer', popis: 'Vedoucí oddělení vývoje' },
    { id: 'n2', label: 'Eva Nováková', sex: 'F', status: 'živá', role: 'Projektový manažer', popis: 'Zodpovědná za klientský vývoj' },
    { id: 'n3', label: 'Tomáš Novák', sex: 'M', status: 'mrtvý', role: 'Senior Developer', popis: 'Odborník na backend' },
    { id: 'n4', label: 'Lucie Hrubá', sex: 'F', status: 'živá', role: 'UX Designer', popis: 'Design a použitelnost' },
    { id: 'n5', label: 'David Hrubý', sex: 'M', status: 'živý', role: 'Test Engineer', popis: 'Automatizované testování' },
    { id: 'n6', label: 'Alena Černá', sex: 'F', status: 'živá', role: 'HR', popis: 'Lidské zdroje' },
    { id: 'n7', label: 'Petr Malý', sex: 'M', status: 'živý', role: 'Výkonný ředitel', popis: 'CEO společnosti' },
    { id: 'n8', label: 'Anna Malá', sex: 'F', status: 'živá', role: 'Asistentka', popis: 'Podpora vedení' },
    { id: 'n9', label: 'Milan Svoboda', sex: 'M', status: 'živý', role: 'Analytik', popis: 'Datová analýza' },
    { id: 'n10', label: 'Robot-X23', sex: 'N', status: 'aktivní', role: 'AI Asistent', popis: 'Virtuální pomocník pro projekty' }
  ],
  edges: [
    { source: 'n1', target: 'n2', label: 'Spolupráce' },
    { source: 'n2', target: 'n3', label: 'Řídí tým' },
    { source: 'n3', target: 'n4', label: 'Spolupracuje na návrhu' },
    { source: 'n3', target: 'n5', label: 'Zajišťuje testovací data' },
    { source: 'n6', target: 'n1', label: 'HR přidělil' },
    { source: 'n7', target: 'n1', label: 'Pověřen řízením' },
    { source: 'n7', target: 'n8', label: 'Asistence' },
    { source: 'n9', target: 'n3', label: 'Poskytuje analýzu' },
    { source: 'n10', target: 'n3', label: 'AI konzultace' },
    { source: 'n10', target: 'n2', label: 'AI podpora projektů' },
    { source: 'n1', target: 'n1', label: 'Vlastní kontrola' }, // self-loop
    { source: 'n4', target: 'n5', label: 'UX testování' },
    { source: 'n2', target: 'n6', label: 'Zpětná vazba pro HR' },
    { source: 'n9', target: 'n10', label: 'Napájení daty' },
    { source: 'n8', target: 'n7', label: 'Podpora vedení' }
  ]
};
