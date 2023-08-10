const z = require("zod");

const languageSchema = z.object({
  name: z.string().min(1).max(20),
  description: z
    .string()
    .min(30, "La descripcion deberia contener como minimo 30 caracteres."),
  authors: z.array(z.string()).nonempty(),
  year: z.number().int().min(1900),
  paradigms: z.array(
    z.enum([
      "Imperativa",
      "Orientada a Objetos",
      "Funcional",
      "Reactiva",
      "Eventos",
      "Estructurada",
      "Multiparadigma",
      "Concurrencia",
    ])
  ),
  logo: z.string().url("El logo deberia ser el enlace a la imagen del logo."),
});

function validateLanguage(input) {
  // safeParse retorna un obejeto de tipo -> { success: false; error: ZodError } || { success: true; data: 'billie' }
  return languageSchema.safeParse(input);
}

function validatePartialLanguage(input){
    // partial convierte todo el esquema como requisitos opcionales y en caso que tenga uno validarlo como es.
      // safeParse retorna un obejeto de tipo -> { success: false; error: ZodError } || { success: true; data: 'billie' }
    return languageSchema.partial().safeParse(input);

}

module.exports = {
  validateLanguage,
  validatePartialLanguage
};
