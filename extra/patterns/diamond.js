
    function Diamond( n) 
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
      
      
        for (i = n; i > 0; i--) 
        { 
        
            for (j = 0; j < space; j++) 
            process.stdout.write(" "); 
      
    
            for ( j = 0; j < i; j++) 
            process.stdout.write("* "); 
      
            process.stdout.write("\n"); 
            space++; 
        } 
        console.log();
    } 
      
  var a=process.argv[2];
        Diamond(5); 
          
 

  
