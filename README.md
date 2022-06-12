# File manager
The program is started by npm-script start in following way:
    ```npm run start -- --username=your_username ```
    
    
List of operations and their syntax:
- Navigation & working directory (nwd)
    - Go upper from current directory (when you are in the root folder this operation shouldn't change working directory)  
    ```bash
    up
    ```
    - Go to dedicated folder from current directory (`path_to_directory` can be relative or absolute)
    ```bash
    cd path_to_directory
    cd ../
    cd /Users/Iv
    cd C:\Users\Iv\nodejs
    ```
    - List all files and folder in current directory and print it to console
    ```bash
    ls
    ```
- Basic operations with files
    - Read file and print it's content in console: 
    ```bash
    cat path_to_file
    cat C:\Users\Iv\test.txt
    cat ../test.txt
    ```
    - Create empty file in current working directory: 
    ```bash
    add new_file_name
    ```
    - Rename file: 
    ```bash
    rn path_to_file new_filename
    rn C:\Users\Iv\test1.txt test2.txt
    ```
    - Copy file: 
    ```bash
    cp path_to_file path_to_new_directory
    ```
    - Move file (same as copy but initial file is deleted): 
    ```bash
    mv path_to_file path_to_new_directory
    ```
    - Delete file: 
    ```bash
    rm path_to_file
    ```
- Operating system info (prints following information in console)
    - Get EOL (default system End-Of-Line)  
    ```bash
    os --EOL
    ```
    - Get host machine CPUs info (overall amount of CPUS plus model and clock rate (in GHz) for each of them)  
    ```bash
    os --cpus
    ```
    - Get home directory: 
    ```bash
    os --homedir
    ```
    - Get current *system user name* (Do not confuse with the username that is set when the application starts)  
    ```bash
    os --username
    ```
    - Get CPU architecture for which Node.js binary has compiled  
    ```bash
    os --architecture
    ```
- Hash calculation  
    - Calculate hash for file and print it into console  
    ```bash
    hash path_to_file
    ```
- Compress and decompress operations **(path_to_destination — this is the folder where the result is placed)**  
  *If the result of a previous operation with the same name and extension is in the destination folder,  
  the file isn't overwritten! The console will print "Operation failed".*
    - Compress file (using Brotli algorytm)
    ```bash
    compress path_to_file path_to_destination
    compress test.png C:\Users\Iv\Compress
    compress C:\Users\Iv\Compress\lazy.png \Users\Iv\Compress\Uncompress\
    ```
    - Decompress file (using Brotli algorytm)  
    ```bash
    decompress path_to_file path_to_destination
    decompress C:\Users\Iv\Compress\Uncompress\lazy.png.br \Users\Iv\Compress\
    decompress ../image.png.br  C:\Users\Iv\Compress\Uncompress\
    ```
    
