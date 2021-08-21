
var topRowSearchingIndices = [
[i, j - 1],
[i, j + 1],
[i + 1, j - 1],
[i + 1, j],
[i + 1, j + 1]
];

var bottomRowSearchingIndices = [
[i - 1, j - 1],
[i - 1, j],
[i - 1, j + 1],
[i, j - 1],
[i, j + 1]
];

var leftColumnSearchingIndices = [
[i - 1, j],
[i - 1, j + 1],
[i, j + 1],
[i + 1, j],
[i + 1, j + 1]
];

var rightColumnSearchingIndices = [
[i - 1, j - 1],
[i - 1, j],
[i, j - 1],
[i + 1, j - 1],
[i + 1, j]
];