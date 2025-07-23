# Fix import paths in all JavaScript files
$files = Get-ChildItem -Path "pages" -Recurse -Include "*.js"

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    
    # Fix imports for files in root pages directory
    if ($file.Directory.Name -eq "pages") {
        $content = $content -replace "from '\.\./src/", "from '../src/"
        $content = $content -replace 'from "\.\./src/', 'from "../src/'
    }
    # Fix imports for files in subdirectories (like listing, package, etc.)
    else {
        $content = $content -replace "from '\.\./src/", "from '../../src/"
        $content = $content -replace 'from "\.\./src/', 'from "../../src/'
        $content = $content -replace "from '\.\.\.\/src/", "from '../../../src/"
        $content = $content -replace 'from "\.\.\.\/src/', 'from "../../../src/'
    }
    
    Set-Content -Path $file.FullName -Value $content
    Write-Host "Fixed imports in: $($file.FullName)"
}
