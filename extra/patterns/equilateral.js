
    function equilateral(n) 
    { 
       
        let space = n - 1; 
      

        for (let i = 0; i < n; i++) 
        { 
           
            for (let j = 0; j < space; j++) 
                process.stdout.write(" "); 
       
            for (let j = 0; j <= i; j++) 
            process.stdout.write("* "); 
      
            process.stdout.write("\n"); 
            space--; 
        } 
      
        
        space = 0; 
      
      
        
        console.log();
    } 
      
  let a=process.argv[2];
  if(a>=2 && a<=10){
  equilateral(a); 
  }
  else{
    process.stdout.write ("please enter no between 2 to 10 \n");
  } 
 

  
