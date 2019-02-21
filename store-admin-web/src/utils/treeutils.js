
export function generateTree(list = []) {
  const tree = [];
  const mapping = {};
  const loopChildren = (pid) => {
    const arr = mapping[pid] || [];
    arr.forEach((item) => {
      item.children = loopChildren(item.id);
    });
    return mapping[pid];
  };

  list.forEach((item) => {
    if (!item.parentId) {
      tree.push(item);
    } else {
      mapping[item.parentId] = mapping[item.parentId] || [];
      mapping[item.parentId].push(item);
    }
  });
  tree.forEach((item) => {
    item.children = loopChildren(item.id);
  });

  return tree;
}

export function generateMenuTree(list = []) {
  const mapping = {};
  list.forEach((item) => {
    if (item.parentId) {
      if (!mapping[item.parentId]) {
        mapping[item.parentId] = [];
      }
      mapping[item.parentId].push(item);
    }
  });
  const roots = list.filter((item) => {
    item.children = mapping[item.id];
    return !item.parentId;
  });

  return roots;
}

