

cnt = 0

$(function() {
    if (cnt == 0) {
        $('#back').attr('class','disabled')
    }else{
        $('#back').attr('class','')
    }
    $('#back').on({
        click:function(){
            cnt = cnt - 1
            if (cnt == 0) {
                $('#back').attr('class','disabled')
            }else if(cnt == 9){
                $('#next').attr('class','disabled')
            }
            else{
                $('#back').attr('class','')
                $('#next').attr('class','')
            }
            $('#pic').attr('src', 'images/'+ cnt +'.jpg');
            
            console.log(cnt)
        }
        
    });
    
    $('#next').on({
        click:function(){
            cnt = cnt + 1
            if (cnt == 9) {
                $('#next').attr('class','disabled')
            }else if (cnt == 0) {
                $('#back').attr('class','disabled')
            }
            else{
                $('#next').attr('class','')
                $('#back').attr('class','')
            }
            $('#pic').attr('src', 'images/'+ cnt +'.jpg');
            
            console.log(cnt)
        }
    });
});