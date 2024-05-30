from django.shortcuts import redirect, render
from django.contrib.auth import authenticate, login, logout
from django.urls import reverse
from .forms import UserRegistrationForm
from django.contrib.auth.decorators import login_required


# Create your views here.

def home(request):
    profesionales = [
        {
            'imagen': 'PaginaCitas/images/img1.png',
            'nombre': 'SHAUN MURPHY',
            'especialidad': 'CIRUJANO PEDIÁTRICO',
            'titulo': 'RESIDENTE QUIRÚRGICO',
            'descripcion': 'Médico residente de cirugía.'
        },
        {
            'imagen': 'PaginaCitas/images/img2.png',
            'nombre': 'DR. GREGORY HOUSE',
            'especialidad': 'MEDICINA INTERNA',
            'titulo': 'JEFE DE DIAGNÓSTICO',
            'descripcion': 'Enfoque particular en el diagnóstico de enfermedades poco comunes o difíciles de tratar.'
        },
        {
            'imagen': 'PaginaCitas/images/img3.png',
            'nombre': 'DRA. CRISTINA YANG',
            'especialidad': 'CIRUGÍA TORÁCICA Y CARDIOVASCULAR',
            'titulo': 'CIRUJANA JEFE',
            'descripcion': 'La Dra. Yang es conocida por ser ambiciosa, tenaz y altamente competente en el quirófano.'
        },
        {
            'imagen': 'PaginaCitas/images/img4.png',
            'nombre': 'DR. STEPHEN STRANGE',
            'especialidad': 'NEUROCIRUGÍA',
            'titulo': 'NEUROCIRUJANO RENOMBRADO',
            'descripcion': 'Dr. Strange es un neurocirujano renombrado y altamente talentoso.'
        }
    ]
    return render(request, 'PaginaCitas/Home.html', {'profesionales': profesionales})

def Login(request):
    if request.method == 'POST':
        email = request.POST.get('email')
        password = request.POST.get('password')
        user = authenticate(request, email=email, password=password)
        if user is not None:
            login(request, user)
            return redirect('chat')  # Redirigir a la página de Chat después de iniciar sesión
        else:
            error_message = "Correo o contraseña incorrectos"
            return render(request, 'PaginaCitas/Login.html', {'error_message': error_message})
    return render(request, "PaginaCitas/Login.html")

from django.http import HttpResponseServerError

def Register(request):
    if request.method == 'POST':
        form = UserRegistrationForm(request.POST)
        if form.is_valid():
            try:
                user = form.save(commit=False) 
                user.set_password(form.cleaned_data['password'])  # Establecer la contraseña para el usuario
                user.save()  # Guardar el usuario en la base de datos
                return redirect('login')  # Redirigir al usuario al inicio de sesión después de que se haya registrado correctamente
            except Exception as e:
                # Devuelve una respuesta de error 500 con información sobre la excepción
                return HttpResponseServerError(f"Error: {e}")
    else:
        form = UserRegistrationForm()
    
    return render(request, 'PaginaCitas/register.html', {'form': form})

def custom_logout(request):
    logout(request)
    return redirect(reverse('home'))

@login_required
def Chat(request):
    return(render(request, "PaginaCitas/ChatBot.html"))