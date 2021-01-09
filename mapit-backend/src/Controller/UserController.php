<?php

namespace App\Controller;

use App\Repository\UserRepository;
use App\Entity\User;
use App\Serializer\UserSerializer;
use App\Services\AuthenticationService;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class UserController extends AbstractController
{
    /**
     * @Route("/user", methods={"GET"})
     */
    public function index( Request $request, UserRepository $userRepository, UserSerializer $userSerializer, AuthenticationService $authentication ): JsonResponse
    {
        if (!$authentication->isValid($request)) {
            return $this->json(['error' => 'Not authorized'], JsonResponse::HTTP_UNAUTHORIZED);
        }

        $users = $userRepository->findAll();

        return new JsonResponse(
            $userSerializer->serialize($users),
            JsonResponse::HTTP_OK,
            [],
            true
        );
    }

    /**
     * @Route("/user", methods={"POST"})
     */
    public function register(
        Request $request, 
        UserRepository $userRepository, 
        UserSerializer $userSerializer
        ): JsonResponse {
    
            $user = $userSerializer->deserialize($request->getContent());
            $emailExists = $userRepository->findBy(['email' => $user->getEmail()]);

            if(sizeof($emailExists) > 0) {
                return $this->json(['errors'=>['This E-Mail is already registered.']], JsonResponse::HTTP_UNPROCESSABLE_ENTITY);
            }

            $userRepository->save($user);
            
            return new JsonResponse(
                $userSerializer->serialize($user),
                JsonResponse::HTTP_OK,
                [],
                true
            );
    }
}