const fixes = {};

const fillStyleId = figma.currentPage.selection[0]["fillStyleId"];
fillStyleId && console.log("fillStyleId", fillStyleId);
// figma.currentPage.selection[0]["fills"] = [];
// figma.currentPage.selection[0]["fillStyleId"] = null;

// 22830:330105
// console.log("id", figma.currentPage.selection[0]["id"]);

// const fillStyleId = figma.currentPage.selection[0]["fillStyleId"];
// fillStyleId && console.log("fillStyleId", fillStyleId);
// const strokeStyleId = figma.currentPage.selection[0]["strokeStyleId"];
// strokeStyleId && console.log("strokeStyleId", strokeStyleId);

// 4c7db22717863ce7c68189d75ba54f18723c0481

// figma
//   .importStyleByKeyAsync("4c7db22717863ce7c68189d75ba54f18723c0481")
//   .then((style) => {
//     figma.currentPage.selection[0]["fillStyleId"] = style.id;
//     console.log("done");
//   });

// let node = figma.currentPage.findOne(
//   (n) =>
//     n.id ===
//     "I26429:355974;26384:359207;25196:367779;25847:355543;22830:331316;22704:327175;413:180"
// );
// figma.currentPage.selection = [node];
// figma.viewport.scrollAndZoomIntoView([node]);

// Library
const brokenToWorkingStyleId = {
  "6d40ba5ad182a999a501768e80b1da4b8fa231d4":
    "fe3bfda22784624ebc72547c3e526d0e1ca315cb",
  "8b3d6e4daa17e7d56c780fb58dd28a4adb70eb1d":
    "5ec24d05c4efa98ac2ff9cdee6857b7f0405063e",
  c342e7fb9cc5c59584b61609ecefacee1bddbf2d:
    "fd656735b86b49267988cc53ad10827d9a47b7bb",
  "1848bb26c7723c0b7840cca4d36d309baac88081":
    "ab6827d4e2d7c06ab4dae4b1876bdb139fa85100",
  c5e9024659b558a52cdf821365fa72a7895a2bc5:
    "0bd8b8de81f606f927efe9b3228925f5ffbdba98",
  "0b3742e5ef4dd74d2c3add8ab7d5c21bc7fb7325":
    "13375713e3901ee5214d164a4a9e31a7fd3a7eed",
  "125e704d24fea3aec06abcfdec96f2b43e69269b":
    "63e72c497fa75f2af2b59931910782c539d7da2b",
  d38de9e0bded16283a5c64cf0b0325e87c26d21f:
    "af57bb2d5eed62a3aa8c01282b23dd814de8c3d0",
  a20363eb30f7e4ed4773f032c80f4b21b0bdb973:
    "1992330df46952f14e71cb15785a62976f8d89e2",
  af74307c5846decb73d9634ecf7823c151188a66:
    "4c7db22717863ce7c68189d75ba54f18723c0481",
  c4d491963e2ac1ffbd70ea4a44b033fb71afc5a2:
    "7e82cefd2a139615513b5cb9899663a2f26a4e7c",
  "7966e8e3b8d35c90f032128ed0e244e61a4f31a2":
    "b2072b5c73acff740cb6b392df7f5d360d733d7b",
  "0efec6c9d368e0491a45b465fa2f7c80953a1402":
    "226ed7e8e6ac3f112dcc8a379001c52992481a9f",
  "4b04dda597c97a70956f312c2b2cc20e7753892b":
    "302b56b4201d9b861bd6aea326400b37e5ff75d6",
};

const oppositesDarkToLight = {
  fe3bfda22784624ebc72547c3e526d0e1ca315cb:
    "af57bb2d5eed62a3aa8c01282b23dd814de8c3d0",
  "5ec24d05c4efa98ac2ff9cdee6857b7f0405063e":
    "1992330df46952f14e71cb15785a62976f8d89e2",
  fd656735b86b49267988cc53ad10827d9a47b7bb:
    "4c7db22717863ce7c68189d75ba54f18723c0481",
  ab6827d4e2d7c06ab4dae4b1876bdb139fa85100:
    "7e82cefd2a139615513b5cb9899663a2f26a4e7c",
  "0bd8b8de81f606f927efe9b3228925f5ffbdba98":
    "b2072b5c73acff740cb6b392df7f5d360d733d7b",
  "13375713e3901ee5214d164a4a9e31a7fd3a7eed":
    "226ed7e8e6ac3f112dcc8a379001c52992481a9f",
  "63e72c497fa75f2af2b59931910782c539d7da2b":
    "302b56b4201d9b861bd6aea326400b37e5ff75d6",
};

const oppositesLightToDark = {
  af57bb2d5eed62a3aa8c01282b23dd814de8c3d0:
    "fe3bfda22784624ebc72547c3e526d0e1ca315cb",
  "1992330df46952f14e71cb15785a62976f8d89e2":
    "5ec24d05c4efa98ac2ff9cdee6857b7f0405063e",
  "4c7db22717863ce7c68189d75ba54f18723c0481":
    "fd656735b86b49267988cc53ad10827d9a47b7bb",
  "7e82cefd2a139615513b5cb9899663a2f26a4e7c":
    "ab6827d4e2d7c06ab4dae4b1876bdb139fa85100",
  b2072b5c73acff740cb6b392df7f5d360d733d7b:
    "0bd8b8de81f606f927efe9b3228925f5ffbdba98",
  "226ed7e8e6ac3f112dcc8a379001c52992481a9f":
    "13375713e3901ee5214d164a4a9e31a7fd3a7eed",
  "302b56b4201d9b861bd6aea326400b37e5ff75d6":
    "63e72c497fa75f2af2b59931910782c539d7da2b",
};

function createInstances() {
  const instancesFrame = figma.currentPage.children.find(
    (node) => node.name === "_all_instances"
  ) as FrameNode;

  let processedCompsCount = 0;
  function processComponentNode(componentNode) {
    processedCompsCount++;
    // if (processedCompsCount > 3) return;

    const instance = componentNode.createInstance();
    instancesFrame.appendChild(instance);
  }

  figma.currentPage.children.forEach((node) => {
    if (node.type === "COMPONENT_SET") {
      node.children.forEach((variant) => {
        if (variant.type === "COMPONENT") {
          processComponentNode(variant);
        }
      });
    } else if (node.type === "COMPONENT") {
      processComponentNode(node);
    }
  });
}

let fixesCount = 0;
const generatedFixes = {};

function generateFixesMapFromNode(node) {
  // if (fixesCount > 3) return;
  if (node.children) {
    node.children.forEach(generateFixesMapFromNode);
  }
  const { id, fillStyleId } = node;
  if (!fillStyleId) {
    return;
  }
  if (typeof fillStyleId["split"] !== "function") {
    return;
  }
  const fillStyleKey = fillStyleId.split(":")[1].split(",")[0];

  if (fillStyleKey && brokenToWorkingStyleId[fillStyleKey]) {
    generatedFixes[id] = brokenToWorkingStyleId[fillStyleKey];
    fixesCount++;
  }
}

const fetchedStyles = {};

async function fetchStyle(styleKey): Promise<null> {
  const style = await figma.importStyleByKeyAsync(styleKey);
  fetchedStyles[styleKey] = style;
  console.log("fetchedStyle");
  return new Promise((resolve) => resolve(null));
}

async function fetchAllStyles() {
  const processedStyles = [];
  const requiredStyles = [...new Set(Object.values(fixes))];
  const promises = requiredStyles.map(fetchStyle);
  return await Promise.all(promises);
}

function applyFixToNode(node) {
  if (node.children) {
    node.children.forEach(applyFixToNode);
  }
  if (fixes[node.id]) {
    const styleKey = fixes[node.id];
    console.log("id", node.id);
    if (fetchedStyles[styleKey]) {
      node.fillStyleId = fetchedStyles[styleKey].id;
      console.log("applied", { styleKey });
    } else {
      console.log("no style fetched", { styleKey });
    }
  }
}

function generateAllFixes() {
  figma.currentPage.children.forEach((node) => {
    if (node.type !== "COMPONENT_SET" && node.type !== "COMPONENT") {
      return;
    }
    generateFixesMapFromNode(node);
  });
  console.log(JSON.stringify(generatedFixes));
}

async function applyFixes() {
  await fetchAllStyles();
  console.log({ fetchedStyles });
  figma.currentPage.children.forEach(applyFixToNode);
  console.log("done");
}

// Step 1
// createInstances();

// Step 2
// generateAllFixes();

// Step 3
// applyFixes();

figma.closePlugin();
