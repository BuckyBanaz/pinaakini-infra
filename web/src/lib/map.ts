// Approximate positions of projects around Nellore, from the locality in each listing.
// CONFIRM with the client: replace with real site coordinates before launch.
export const PROJECT_COORDS: Record<string, [lat: number, lon: number]> = {
  "avaria-signature-villa": [14.4, 79.985],
  "pinaakini-emerald-bay": [14.4, 79.905],
  "pinaakini-palm-meadows": [14.338, 79.935],
  "pinaakini-royal-county": [14.468, 79.962],
  "pinaakini-eco-farms": [14.47, 79.82],
  "pinaakini-green-city-phase-1": [14.418, 79.93],
  "pinaakini-green-city-phase-2": [14.398, 79.94],
  "pinaakini-symphony": [14.44, 79.99],
  "pinaakini-serene-enclave": [14.418, 79.968],
  "pinaakini-highway-heights": [14.492, 79.952],
  "pinaakini-green-pastures": [14.552, 79.808],
  "pinaakini-silver-springs": [14.442, 79.935],
  "pinaakini-grand-crest": [14.458, 80.012],
  "pinaakini-coastal-greens": [14.33, 80.075],
  "pinaakini-heritage-county": [14.462, 79.99],
};

// Map frame (lon/lat bounds) and its SVG size.
export const MAP = { west: 79.76, east: 80.14, north: 14.6, south: 14.28, w: 1000, h: 842 };

export function project([lat, lon]: [number, number]): [number, number] {
  const x = ((lon - MAP.west) / (MAP.east - MAP.west)) * MAP.w;
  const y = ((MAP.north - lat) / (MAP.north - MAP.south)) * MAP.h;
  return [Math.round(x), Math.round(y)];
}

const line = (pts: [number, number][]) =>
  pts
    .map((p, i) => {
      const [x, y] = project(p);
      return `${i ? "L" : "M"}${x} ${y}`;
    })
    .join(" ");

// Stylised geography: the Penna (Pinakini) river, main roads and the coast.
export const GEO = {
  city: project([14.443, 79.987]),
  river: line([
    [14.5, 79.76],
    [14.485, 79.82],
    [14.47, 79.875],
    [14.478, 79.93],
    [14.472, 79.975],
    [14.49, 80.02],
    [14.53, 80.06],
    [14.57, 80.1],
    [14.585, 80.14],
  ]),
  roads: [
    { name: "NH 16", d: line([[14.6, 79.975], [14.5, 79.958], [14.44, 79.95], [14.36, 79.94], [14.28, 79.925]]) },
    { name: "Atmakur road", d: line([[14.443, 79.987], [14.5, 79.88], [14.6, 79.77]]) },
    { name: "Rapur road", d: line([[14.443, 79.987], [14.46, 79.88], [14.47, 79.76]]) },
    { name: "Podalakur road", d: line([[14.443, 79.987], [14.41, 79.9], [14.37, 79.76]]) },
    { name: "Muthukur road", d: line([[14.443, 79.987], [14.38, 80.04], [14.3, 80.11]]) },
  ],
  coast: line([[14.6, 80.118], [14.52, 80.125], [14.44, 80.128], [14.36, 80.12], [14.28, 80.108]]),
};
