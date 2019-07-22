
    function equilateral( n) 
    { 
       
        var space = n - 1; 
      

        for (var i = 0; i < n; i++) 
        { 
           
            for (var j = 0; j < space; j++) 
                process.stdout.write(" "); 
       
            for ( j = 0; j <= i; j++) 
            process.stdout.write("* "); 
      
            process.stdout.write("\n"); 
            space--; 
        } 
      
        
        space = 0; 
      
      
        
        console.log();
    } 
      
  var a=process.argv[2];
       equilateral(5); 
          
 

  
