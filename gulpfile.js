var gulp = require("gulp");
var eslint = require("gulp-eslint");
var path = require("path");
var del = require("del");
var concat = require("gulp-concat");
var fs = require("fs");

var dirAplicacao = "./web/app";
var dirNodeModules = "./node_modules";
var dirOutputJS = "./web/app/assets/js";
var dirOutputCSS = "./web/app/assets/css";
var dirOutputImg = "./web/app/assets/img";
var dirModulos = "./web/app/modules";
var dirResources = "./web/app/assets/resources";
var nomeAplicacao = JSON.parse(lerArquivo("./package.json")).name;

function listarModulos(caminhoDiretorio_) {
    return fs.readdirSync(caminhoDiretorio_).filter(function (arquivo) {
        return fs.statSync(path.join(caminhoDiretorio_, arquivo)).isDirectory();
    });
}

function lerArquivo(caminhoArquivo_){
    return fs.readFileSync(caminhoArquivo_);
}

gulp.task("analise-estatica", function () {
    return gulp.src([path.join(dirAplicacao, "**/*.js"), ("!" + path.join(dirNodeModules, "**"))])
        .pipe(eslint())
        .pipe(eslint.formatEach())
        .pipe(eslint.failAfterError());
});

gulp.task("compilar", ["analise-estatica"]);

gulp.task("default", ["compilar"]);

gulp.task("limpar-diretorio-output", ["analise-estatica"], function (cb) {
    del([path.join(dirOutputJS, "**/*.*")]);
    cb();
});

gulp.task("limpar-diretorio-output-css", ["analise-estatica"], function (cb) {
    del([path.join(dirOutputCSS, "**/*.*"), ("!" + path.join(dirOutputCSS, "**/apl.css"))]);
    cb();
});

gulp.task("limpar-diretorio-output-img", ["analise-estatica"], function (cb) {
    del([path.join(dirOutputImg, "**/*.*"), ("!" + path.join(dirOutputImg, "**/logo1.png"))]);
    cb();
});

gulp.task("consolidar-dependencias", ["limpar-diretorio-output"], function () {
    return gulp.src([
        path.join(dirNodeModules, "angular/angular.min.js"),
        path.join(dirNodeModules, "angular-ui-router/release/angular-ui-router.js"),
        path.join(dirNodeModules, "angular-ui-bootstrap/dist/ui-bootstrap.js"),
        path.join(dirNodeModules, "ngmap/build/scripts/ng-map.min.js")
        ])
        .pipe(concat("dependencias.js"))
        .pipe(gulp.dest(dirOutputJS));
});

gulp.task("copiar-angular", ["limpar-diretorio-output"], function () {
    return gulp.src([
        path.join(dirNodeModules, "angular/angular.min.js")])
        .pipe(gulp.dest(dirOutputJS));
});

gulp.task("copiar-ui-bootstrap", ["limpar-diretorio-output"], function () {
    return gulp.src([
        path.join(dirNodeModules, "angular-ui-bootstrap/dist/ui-bootstrap.js")])
        .pipe(gulp.dest(dirOutputJS));
});

gulp.task("consolidar-estilos-dependencia", ["limpar-diretorio-output-css"], function () {
    var thirdPartyCSS = [
        path.join(dirNodeModules, "angular-ui-bootstrap/dist/ui-bootstrap-csp.css")
    ];

    return gulp.src(thirdPartyCSS)
        .pipe(concat("estilos.css"))
        .pipe(gulp.dest(dirOutputCSS));
});

gulp.task("copiar-estilos", ["limpar-diretorio-output-css"], function(){
    var cssFiles = "./web/app/assets/resources/*.css";

    return gulp.src(cssFiles).pipe(gulp.dest(dirOutputCSS));
});

gulp.task("consolidar-modulos", ["limpar-diretorio-output"], function () {
    var modulos = listarModulos(dirModulos);

    modulos.forEach(function (diretorio) {
        var nomeArquivo = nomeAplicacao + "." + diretorio + ".js";
        var caminhoModulo = path.join(dirModulos, diretorio);

        gulp.src([path.join(caminhoModulo, "/*.module.js"), path.join(caminhoModulo, "/**/*.js")])
            .pipe(concat(nomeArquivo))
            .pipe(gulp.dest(dirOutputJS));
    });
});

gulp.task("build", [
    "limpar-diretorio-output",
    "limpar-diretorio-output-css",
    // "limpar-diretorio-output-img",
    "consolidar-dependencias",
    "consolidar-estilos-dependencia",
    "consolidar-modulos",
    "copiar-estilos",
    // "copiar-angular",
    // "copiar-ui-bootstrap",
    "analise-estatica"
]);

gulp.task("default", ["build"]);
