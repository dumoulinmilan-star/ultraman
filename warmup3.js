function twoSum (array, count) {
    let pairs = []
    for (i=0;i<array.length-1;i++) {
        for (j=i+1;j<array.length; j++) {
                if (array[i] + array[j] === count) {
                pairs.push([i,j])
            }
        }
    }
    return pairs
}

console.log(pairs)