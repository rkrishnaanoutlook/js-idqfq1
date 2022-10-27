// Import stylesheets
import './style.css';
import permissions from './data.json';

let TREE_DATA = [];

permissions.forEach((permission) => {
  let componentName = permission.component.label;

  let componentPermissions = permission.permissions;
  let hasModify = componentPermissions.includes('Modify');
  let hasView = componentPermissions.includes('View');
  let modifyElements = componentPermissions
    .filter((cp) => {
      return cp.startsWith('Modify') && cp.length > 'Modify'.length;
    })
    .map((cp) => {
      return { name: cp, componentName };
    });
  let viewElements = componentPermissions.filter((cp) => {
    return cp.startsWith('View') && cp.length > 'View'.length;
  })
  .map((cp) => {
    return { name: cp, componentName };
  });;

  TREE_DATA = [
    ...TREE_DATA,
    {
      name: componentName,
      componentName: null,
      children: [
        ...(hasModify
          ? [
              {
                name: 'Modify',
                componentName,
                ...(modifyElements.length > 0
                  ? { children: modifyElements }
                  : {}),
              },
            ]
          : []),
        ...(hasView
          ? [
              {
                name: 'View',
                componentName,
                ...(viewElements.length > 0 ? { children: viewElements } : {}),
              },
            ]
          : []),
      ],
    },
  ];
});

console.log(JSON.stringify(TREE_DATA));
