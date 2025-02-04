[ $# -eq 0 ] && echo "no argurment supplied" && exit 1
for arg in "$@"; do mkdir "ex$arg"; done 
