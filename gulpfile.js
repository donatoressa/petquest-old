var gulp = require("gulp");
var eslint = require("gulp-eslint");
var path = require("path");
var dirAplicacao = "./web/app";
var dirNodeModules = "./node_modules";

gulp.task("analise-estatica", function(){
    return gulp.src([path.join(dirAplicacao, "**/*.js"), ("!"+ path.join(dirNodeModules, "**"))])
            .pipe(eslint())
            .pipe(eslint.formatEach())
            .pipe(eslint.failAfterError());
});

gulp.task("compilar",["analise-estatica"]);

gulp.task("default", ["compilar"]);