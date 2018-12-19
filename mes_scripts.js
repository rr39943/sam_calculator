NB_CALCULS = 8;

class Calcul {
	constructor(id){
		// while{
        this.id = id.toString();
		var x = Math.floor(Math.random() * 200);
		var y = 1;
		var operation = '+';
		// var x = Math.floor(Math.random() * 13);
		// var y = Math.floor(Math.random() * 13);
		// var operation = Math.random() > 0.2 ? '+' : '-';
		if (x < y && operation === '-') {
			[x, y] = [y, x];
		}
		// }
		this.set_calcul(x, y, operation);
	}
	set_calcul(x, y, operation) {
		this.x = x;
		this.y = y;
		this.operation = operation;
		this.txt = this.x + ' ' + this.operation + ' ' + this.y;
		this.result = eval(this.txt);
		this.txt += ' = ';
	}
}
class ListCalculs {
	constructor(nb_calculs) {
		this.calculs = []
		while (this.calculs.length < nb_calculs){
			var nouveau_calcul = new Calcul(this.calculs.length);
			if (!this.test_deja_dans_liste(nouveau_calcul)){
				this.calculs.push(nouveau_calcul);
			}
		}
        console.log(this.calculs)
        this.calculs.forEach( (calcul) => this.display_calcul(calcul));
	}
	test_deja_dans_liste(calcul){
		for (let calcul_a_tester of this.calculs){
			if (calcul_a_tester.txt === calcul.txt){
				return true;
			}
		}
		return false;
	}
    display_calcul(calcul){
        $('#calculs').append('<p class="col-md-3 calcul-p" id="calcul' + calcul.id + '"><label for="response'+ calcul.id + '">' + calcul.txt + '</label><input class="form-control response" type="text" id="response' + calcul.id + '" maxlength="4" /><span class="tag-eval"></span></p>');
    }
    corriger(){
        var corrects = 0;
        this.calculs.forEach(function(calcul){
            var response = parseInt($('#response' + calcul.id).val());
            if (response == calcul.result){
                $('#response' + calcul.id).addClass('is-valid');
                $('#response' + calcul.id).removeClass('is-invalid');
                $('#calcul' + calcul.id).addClass('calcul-juste')
                $('#calcul' + calcul.id).removeClass('calcul-faux')
                corrects ++;
            } else {
                $('#response' + calcul.id).addClass('is-invalid');
                $('#response' + calcul.id).removeClass('is-valid');
                $('#calcul' + calcul.id).addClass('calcul-faux')
                $('#calcul' + calcul.id).removeClass('calcul-juste')
            }
        });
        $('#resultat').text(corrects + ' / ' + NB_CALCULS);

        if (corrects===NB_CALCULS){
            $('.calcul-p').remove();
            $('#calculs').append('<p class="calcul-p bravo">BRAVO !</p>');
        }
    }
}
var create_new_list = function(){
    $('.calcul-p').remove();
    $('#resultat').text('')
    return new ListCalculs(NB_CALCULS);
}
