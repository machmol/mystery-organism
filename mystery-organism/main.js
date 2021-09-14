// Returns a random DNA base
const returnRandBase = () => {
  const dnaBases = ['A', 'T', 'C', 'G'];
  return dnaBases[Math.floor(Math.random() * 4)];
};

// Returns a random single stand of DNA containing 15 bases
const mockUpStrand = () => {
  const newStrand = [];
  for (let i = 0; i < 15; i++) {
    newStrand.push(returnRandBase());
  }
  return newStrand;
};

const pAequorFactory = (specimenNum, dna) => {
  return {
    specimenNum,
    dna,
    //mutates the base of the dna, can not resolve to the initial value;
    mutate(){
      let mutatedDna = [];
      for(let i = 0; i < this.dna.length; i++){
        let randomBase = returnRandBase();
        while(randomBase === this.dna[i]){
          randomBase = returnRandBase();
        }
        mutatedDna.push(randomBase);
      }
      this.dna = mutatedDna;
    },
    //compares the dna of the object with the dna of the passed object. returns the percentage of identical bases.
    compareDNA(pAequor){
      let count = 0;
      for(let i = 0; i< pAequor.dna.length; i++){
        if (this.dna[i] === pAequor.dna[i]){
          count++;
        }
      }
      const percentage = (100 / 15) * count;
      console.log(`specimen #${this.specimenNum} and specimen #${pAequor.specimenNum} have ${percentage}% DNA in common.`);
    },
    //object will more likely survive if the amount of "G" and "C" in the base is over 60%
    willLikelySurvive(){
      let count = 0;
      for(let i = 0; i < this.dna.length; i++){
        if (this.dna[i] === "G" || this.dna[i] === "C"){
          count++;
        }
      }
      if(count === 0){
        return false;
      } else if((100 / 15) * count >= 60){
        return true;
      } else {
        return false;
      }

    }
  }
}

//create an array of pAequors which will most liekely survive
let survivors =[];
for(let i = 1; survivors.length !== 30; i++){
  const obj = pAequorFactory(i, mockUpStrand());
  if (obj.willLikelySurvive()){
    survivors.push(obj);
  }
}
//log the array
console.log(survivors);








